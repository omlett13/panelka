# CLAUDE.md

## What this is

**Панелька** — a Doom-style raycaster set in a Soviet panel-block district, built as a browser prototype that mimics a Nintendo 3DS: a 400×240 top screen (first-person view) and a 320×240 bottom touch screen (HUD, map, menus, shop, dialogue), framed by an on-page console with a circle pad and A/B/X/Y/L/R/START/SELECT buttons.

The whole game is **one file**: `Панелька.html` (~4.2 MB, ~4800 lines). There is no build step, package manager, dependencies, or test suite. Open the file in a browser to run it.

```bash
open "Панелька.html"
```

## File layout

`Панелька.html` contains: page CSS → console markup (`#top`, `#bot` canvases, buttons, `#dbg` debug panel) → one `<script>` with all game code. The script is split by banner comments; search for `/* ---------- NAME` to jump between sections (line numbers drift, so don't rely on them):

| Section | Contents |
|---|---|
| `CONFIG`, `SETTINGS` | Screen sizes (`W,H,BW,BH`), palette constants, `SETS`/`SET` (persisted settings), `DIFF` multipliers |
| `LEVELS` | `LEVEL_SRC` — ASCII maps keyed by level number. The comment above it is the legend of map characters |
| `RNG / HELPERS`, map parsing | `MW×MH` = 128×96 grid; `TILE`, `ZONE`, `FLCH` typed arrays; `TMAP`/`ZMAP` char→tile/zone; `parseMap`, `solidCell`, `sightBlock` |
| `TEXTURES`, per-level texture sections, `SPRITES` | All art is **procedurally drawn to canvases at boot** (`tXxx(g,r)` texture painters, `drawXxx(g,pose)` sprite painters, `bake`). No image files |
| `AUDIO` | WebAudio synth (`sfx`, `tone`, `nz`, music sequencers). Boss/crowd music are two base64 MP3s (`CROWD_MP3`, `BOSS_MP3`, defined later near `bossMusic`) — huge single lines, **never print or read them in full** |
| `GAME STATE` | `G` (global game state), `P` (player), `UP` (upgrades), `KINDS` (enemy defs), `PROPS`, `ITEMS`, `NOTES`, `LIGHTSn`, `LEVELDEF`, `loadLevel`, `resetLevel` |
| `FLOW FIELD`, `COLLISION` | BFS flow field toward the player for enemy pathing; `moveBody`, `los`, `rayDist` |
| Per-level gameplay sections | КРЫША, ГОРОД, МЕТРО, ЭЛЕВАТОР, ГАРАЖИ, СТРОЙКА — boss logic, NPCs/dialogue (`TALK`, `NPCS`), set pieces |
| `ЩИТОК`, `ELEVATOR` | Breaker/keypad puzzles; lift rides between floors; shop (`SHOP`, `buy`) |
| `GAME FLOW / MENUS` | `MENUS`, `LNAME`, `HOUSES`, `startAt`, `enterLevel`, checkpoints, `menuAct` |
| `INPUT` | Keyboard, mouse/pointer-lock, touch, on-screen pad/buttons, debug panel handlers |
| `UPDATE` | `update(dt)` main tick, `updatePlayer`, `updateEnemy` (big per-kind switch), projectiles, fx |
| `RENDER: TOP SCREEN` | `renderTop()` — software raycaster into an `ImageData` framebuffer at `RW×RH` (internal res set by the ПИКСЕЛИ setting), sprites with z-buffer, weapon, overlays |
| `RENDER: BOTTOM SCREEN` | `renderBottom()` — HUD, minimap, menus, notes, loot/slots |
| `LAYOUT`, `BOOT` | `fit()` scales the console via the `--u` CSS var; `start()` runs the `requestAnimationFrame` loop |

## Levels

Numbered 1–12, names in `LNAME`; per-level start/lights/objective in `LEVELDEF`. Order of play: Дом 9 (1 floor 1, 2 floor 2 + boss, 3 basement) → Дом 11 (4 floor 1, 5 stairs, 6 floor 2, 7 roof) → 8 Город (hub) → 9 Метро, 10 Стройка, 11 Гаражи, 12 Элеватор. Levels 1–7 use a 64×48 region of the grid; 8+ use the full 128×96. Many functions branch on `G.level===n` — when changing one level, grep for `G.level===N` and `n===N` to find all its special cases (fog, sky, ceiling height, cull distance, floor textures in `loadLevel`).

## Conventions

- Code style is dense, minified-looking JS: short names, many statements per line, `'use strict'`. Match it — don't reformat or expand existing code.
- All in-game text is Russian (UI uses the "Press Start 2P" pixel font, so keep strings short and uppercase where the surrounding UI is).
- The header comment notes this is meant to be **ported to 3DS (devkitPro / citro2d + citro3d)**: keep the two fixed screen resolutions, button mapping, and boot-time generated textures/sprites portable — avoid browser-only shortcuts in core logic.
- `localStorage` keys are prefixed `panelka.` (`v2` settings, `slots`, `notes`, `unlock`, `last`). Every access is wrapped in `try/catch`; keep it that way.
- `window.claude.hot` (bottom of file) supports hot-reload snapshots when hosted as a Claude artifact; it must keep working with and without that object present.
- Only external resources: Google Fonts (Press Start 2P, PT Mono, Russo One). Keep everything else inline.

## Debugging

Press `` ` `` (or the `dbg` button) for the debug panel: jump to any level, skip to bosses/set pieces, kill all, +money, max upgrades, god mode. Handlers live in the `INPUT` section (`data-dbg` values). Exceptions in the main loop are caught and logged to the console rather than stopping the game, so check the console after changes.

## Working with the file

- The file is too large to read whole. Use `grep -n` for symbols and section banners, then read targeted line ranges; pipe through `cut -c1-300` to avoid dumping the base64 MP3 lines (`const CROWD_MP3` / `const BOSS_MP3`, just before `bossFightOn`, ~3.6 MB together) or long map rows.
- Map rows in `LEVEL_SRC` must all have the same width as their level; edit them character-for-character.
