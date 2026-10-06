// Serves the repo over HTTP, loads the game in headless Chromium, checks that the music
// decodes, visits every level through the debug panel, and fails on any console error.
//   node test/smoke.mjs [page]   (default: index.html; e.g. dist/Панелька.html)
import { chromium } from 'playwright';
import { once } from 'node:events';
import { serve } from '../serve.mjs';

const page_ = process.argv[2] || 'index.html';
const server = serve();
await once(server, 'listening');
const url = `http://127.0.0.1:${server.address().port}/${encodeURI(page_)}?debug`;
const LEVELS = ['f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'];

const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()); });
page.on('pageerror', e => errors.push(String(e)));
page.on('requestfailed', r => errors.push('request failed: ' + r.url()));

try {
  await page.goto(url);
  await page.waitForTimeout(1500);
  const where = () => page.evaluate(() => G.level + ':' + G.state);
  console.log('boot', await where());
  await page.keyboard.press('Enter'); // ИГРАТЬ (also creates the AudioContext)
  await page.waitForTimeout(1500);
  console.log('play', await where());
  for (const k of ['boss', 'crowd']) {
    const sec = await page.evaluate(k => new Promise(res => { loadMp3(k, b => res(b.duration)); setTimeout(() => res(-1), 10000); }), k);
    console.log(k + '.mp3', sec > 0 ? sec.toFixed(1) + 's' : 'FAILED');
    if (!(sec > 0)) errors.push(k + '.mp3 did not decode');
  }
  for (const d of LEVELS) {
    await page.evaluate(d => document.querySelector(`[data-dbg="${d}"]`).click(), d);
    await page.waitForTimeout(2500);
    console.log(d, await where());
  }
} finally {
  await browser.close();
  server.close();
}
if (errors.length) { console.error('ERRORS:\n' + [...new Set(errors)].join('\n')); process.exit(1); }
console.log('OK');
