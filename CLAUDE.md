# CLAUDE.md

## What this is

**Панелька** — a Doom-style raycaster set in a Soviet panel-block district, built as a browser prototype that mimics a Nintendo 3DS: a 400×240 top screen (first-person view) and a 320×240 bottom touch screen (HUD, map, menus, shop, dialogue), framed by an on-page console with a circle pad and A/B/X/Y/L/R/START/SELECT buttons.

Plain JavaScript, no framework, no runtime dependencies. Node is only used for the dev server, build and tests.

```bash
npm install        # playwright, for tests
npm start          # http://127.0.0.1:8080/ — serves index.html
npm run build      # → dist/Панелька.html, one self-contained file (CSS, JS and audio inlined)
npm test           # smoke test on the source and on the build
```

Opening `index.html` straight from disk works, but the music won't load (browsers block `fetch` on `file://`). Use `npm start` or the built file.

## Layout

```
index.html        console markup (#top/#bot canvases, buttons, #dbg panel) + <script> tags in load order
style.css         page and console styles
js/*.js           game code, classic scripts sharing one global scope (see below)
audio/*.mp3       boss and crowd music, loaded with loadMp3() in js/audio.js
build.mjs         inlines everything into dist/Панелька.html; swaps audio paths for data: URLs
serve.mjs         tiny static server used by `npm start` and the tests
test/smoke.mjs    headless Chromium: boots, decodes music, visits every level, fails on console errors/warnings
```

### Script files

The `js/` files are **classic scripts, not ES modules**. They share one global scope, so a top-level `const`/`function` in one file is visible in every other file. **Load order in `index.html` matters**: code that runs at load time (e.g. baking textures, `const X=f()`) may only use things defined in the same or earlier files. Functions only *called* later (from the game loop) can live anywhere. Every file starts with `'use strict';`. If you add a file, add it to `index.html` in the right place; `build.mjs` picks it up automatically.

| File | Contents |
|---|---|
| `config.js` | Screen sizes (`W,H,BW,BH`), palette constants, `SETS`/`SET` (saved settings), `DIFF` multipliers |
| `levels.js` | `LEVEL_SRC`: ASCII maps, entities and items per level. The comment at the top is the legend of map characters |
| `map.js` | 128×96 grid (`MW,MH,N`); `TILE`, `ZONE`, `FLCH` typed arrays; `TMAP`/`ZMAP`; `parseMap`, `solidCell`, `sightBlock`; RNG and canvas helpers |
| `textures.js`, `sprites.js` | All art is **drawn in code at boot** (`tXxx(g,r)` texture painters, `drawXxx(g,pose)` sprite painters, `bake`). No image files |
| `audio.js` | WebAudio synth (`sfx`, `tone`, `nz`, music sequencers), `AUDIO_SRC`, `loadMp3` |
| `state.js` | `G` (game state), `P` (player), `UP` (upgrades), `KINDS` (enemy defs), `PROPS`, `ITEMS`, `NOTES`, `LIGHTSn`, `LEVELDEF`, `loadLevel`, `resetLevel` |
| `world.js` | Flow field (BFS toward the player for enemy pathing), collision (`moveBody`, `los`, `rayDist`), messages, player actions (`fire`, `hitEnemy`, …) |
| `roof.js`, `city.js`, `metro.js`, `silo.js`, `garages.js`, `site.js` | Level-specific gameplay: bosses, NPCs/dialogue (`TALK`, `NPCS`), set pieces |
| `puzzles.js`, `lift.js` | Breaker and keypad puzzles; lift rides; shop (`SHOP`, `buy`) |
| `menus.js` | `MENUS`, `LNAME`, `HOUSES`, `startAt`, `enterLevel`, checkpoints, `menuAct` |
| `input.js` | Keyboard, mouse/pointer lock, touch, on-screen pad/buttons, debug panel |
| `update.js` | `update(dt)` main tick, `updatePlayer`, `updateEnemy` (big switch per enemy kind), projectiles, fx |
| `render-top.js` | `renderTop()`: software raycaster into an `ImageData` framebuffer at `RW×RH` (internal res from the ПИКСЕЛИ setting), sprites with z-buffer, weapon, overlays, shop |
| `render-bottom.js` | `renderBottom()`: HUD, minimap, menus, notes, loot/slots |
| `boot.js` | `fit()` scales the console via the `--u` CSS var; `start()` runs the `requestAnimationFrame` loop; `window.claude.hot` snapshot support |

## Levels

Numbered 1–12, names in `LNAME`; per-level start/lights/objective in `LEVELDEF`. Order of play: Дом 9 (1 floor 1, 2 floor 2 + boss, 3 basement) → Дом 11 (4 floor 1, 5 stairs, 6 floor 2, 7 roof) → 8 Город (hub) → 9 Метро, 10 Стройка, 11 Гаражи, 12 Элеватор. Levels 1–7 use a 64×48 part of the grid; 8+ use the full 128×96. Many functions branch on `G.level===n`. When changing one level, grep for `G.level===N` and `n===N` to find all its special cases.

## Conventions

- Code style is dense, minified-looking JS: short names, many statements per line. Match it; don't reformat or expand existing code.
- All in-game text is Russian (UI uses the "Press Start 2P" pixel font, so keep strings short and uppercase where the surrounding UI is).
- The header comment in `config.js` notes this is meant to be **ported to 3DS (devkitPro / citro2d + citro3d)**: keep the two fixed screen resolutions, button mapping, and boot-time generated art portable. Avoid browser-only shortcuts in core logic.
- `localStorage` keys are prefixed `panelka.` (`v2` settings, `slots`, `notes`, `unlock`, `last`). Every access is wrapped in `try/catch`; keep it that way.
- `window.claude.hot` (end of `boot.js`) supports hot-reload snapshots when hosted as a Claude artifact; it must keep working with and without that object present.
- Only external resources: Google Fonts (Press Start 2P, PT Mono, Russo One).

## Debugging and testing

- Press `` ` `` (or the `dbg` button) for the debug panel: jump to any level, skip to bosses/set pieces, kill all, +money, max upgrades, god mode. Handlers are in `input.js` (`data-dbg` values).
- `npm test` drives the game through the debug panel, so keep the `data-dbg` level buttons working.
- Exceptions in the main loop (`update`, `renderTop`, `renderBottom`, each caught separately in `boot.js`) are logged once per distinct error, shown in a red bar at the bottom of the top screen, and an `update` error pauses the game. Check the console after changes.
- `levels.js` map rows must all have the same width as their level; edit them character for character.
