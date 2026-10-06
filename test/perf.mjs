// Frame-time profile: plays representative levels at each ПИКСЕЛИ setting under Chrome CPU throttling
// and prints average/max ms for update, renderTop and renderBottom (from the debug PERF overlay).
//   node test/perf.mjs [throttle...]   (default: 1 4 6)
/* global G, P, SET, PERF, perfReset, setRes, document */ // used inside page.evaluate callbacks
import { chromium } from 'playwright';
import { once } from 'node:events';
import { serve } from '../serve.mjs';

const RATES = process.argv.slice(2).map(Number).filter(Boolean);
const LEVELS = [['f2', 2], ['f7', 7], ['f8', 8], ['f9', 9], ['f10', 10], ['f12', 12]];
const server = serve(); await once(server, 'listening');
const browser = await chromium.launch();
const page = await browser.newPage();
const cdp = await page.context().newCDPSession(page);
await page.goto(`http://127.0.0.1:${server.address().port}/`); // local server: debug panel on, G Proxy off (it distorts timings)
await page.waitForTimeout(1000);
await page.keyboard.press('Enter');
await page.waitForTimeout(800);
await page.evaluate(() => { G.god = true; PERF.on = true; });

const rows = [];
for (const rate of RATES.length ? RATES : [1, 4, 6]) {
  await cdp.send('Emulation.setCPUThrottlingRate', { rate });
  for (const [dbg, n] of LEVELS) {
    await page.evaluate(d => document.querySelector(`[data-dbg="${d}"]`).click(), dbg);
    await page.waitForTimeout(1500);
    for (const px of [0, 1, 2, 3]) {
      await page.evaluate(px => { SET.px = px; setRes(); perfReset(); }, px);
      // turn slowly so the view isn't static
      const t = Date.now(); while (Date.now() - t < 2200) { await page.evaluate(() => { P.a += 0.05; }); await page.waitForTimeout(50); }
      const s = await page.evaluate(() => PERF.stats);
      rows.push({ rate, level: n, px, ...Object.fromEntries(['upd', 'top', 'bot', 'frame'].map(k => [k, s[k]])) });
    }
  }
}
await browser.close(); server.close();

const f = v => v.toFixed(2).padStart(6);
console.log('cpu  lvl  res      update avg/max    renderTop avg/max   renderBottom avg/max   fps');
for (const r of rows) console.log(`${String(r.rate).padStart(2)}x ${String(r.level).padStart(4)}  ${['400x240', '200x120', '133x80', '100x60'][r.px]}  ${f(r.upd.avg)} ${f(r.upd.max)}    ${f(r.top.avg)} ${f(r.top.max)}    ${f(r.bot.avg)} ${f(r.bot.max)}    ${(1000 / r.frame.avg).toFixed(0).padStart(3)}`);
