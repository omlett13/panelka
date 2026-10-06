# Панелька

A Doom-style first-person shooter set in a late-Soviet panel-block district. Fight gopniks, grannies, rats and stray dogs through apartment blocks, rooftops, the metro, a construction site, garages and a grain elevator.

The game runs in the browser and is dressed up as a dual-screen handheld modelled on the Nintendo 3DS. The top screen (400×240) shows the first-person view. The bottom touch screen (320×240) shows the HUD, map, menus, shop and dialogue. It is a prototype for a possible 3DS homebrew port.

## Play

Play it in any modern browser. The quickest way is the single-file build:

```bash
npm install
npm run build
open "dist/Панелька.html"
```

`dist/Панелька.html` has everything inlined (code, styles and music), so you can copy it anywhere and open it. To play from the source while editing, use the dev server:

```bash
npm start
```

and open http://127.0.0.1:8080/. Opening `index.html` straight from disk also works, but without music, because browsers don't let pages on `file://` load the audio files.

Click the top screen to lock the mouse for looking around. Settings, notes and level select are in the main menu. Your progress and settings are saved in the browser.

## Controls

| Key | Action |
|---|---|
| WASD | Move |
| Arrows / mouse | Turn |
| Space / click | Fire |
| E | Use |
| 1 2 3 4 / 5 | Weapon slots / slipper |
| G | Throw vodka (lures enemies) |
| Tab | Loot / inventory |
| Shift | Run |
| Enter / Esc | Pause |

On-screen controls also work with touch and mouse: the circle pad, A (fire), B (use / back), X/Y (switch weapon), L/R (strafe), START (pause) and SELECT (zoom the map).

## Levels

1. **Дом 9** (House 9): floor 1, floor 2, basement
2. **Дом 11** (House 11): floor 1, stairwell, floor 2, roof
3. **Город** (City), the hub, which leads to the **Метро** (Metro), **Стройка** (Construction site), **Гаражи** (Garages) and **Элеватор** (Grain elevator)

## Tech

- Plain JavaScript with no libraries: a software raycaster drawn on a `<canvas>`. The code is in `js/`, split by subsystem; [CLAUDE.md](CLAUDE.md) has a map of it.
- The game draws all its textures and sprites in code when it starts, so there are no image files. Sound effects are synthesized live with WebAudio. Only the boss and crowd music are MP3s (`audio/`).
- `npm test` runs a headless browser through every level and fails on any error.
- Press `` ` `` to open the debug panel, which can jump to any level or turn on god mode.
