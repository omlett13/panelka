// Runs inside the game page (see smoke.mjs). Returns a list of problems in LEVEL_SRC:
// wrong map size, characters parseMap doesn't know (they silently become walls),
// unknown entity types, and entities outside the map.
() => {
  const out = [];
  const known = new Set([...Object.keys(TMAP), ...Object.keys(ZMAP)]);
  const isEnt = t => t === 'car' || t === 'vent' || NPCS[t] || PROPS[t] || ITEMS[t] || KINDS[t];
  for (const [n, L] of Object.entries(LEVEL_SRC)) {
    const W = +n >= 8 ? MW : 64, H = +n >= 8 ? MH : 48;
    if (L.map.length !== MH) out.push(`level ${n}: ${L.map.length} rows, expected ${MH}`);
    L.map.forEach((row, y) => {
      if (row.length !== MW) out.push(`level ${n} row ${y}: width ${row.length}, expected ${MW}`);
      const bad = [...new Set([...row].filter(c => !known.has(c)))];
      if (bad.length) out.push(`level ${n} row ${y}: unknown map characters ${JSON.stringify(bad.join(''))}`);
    });
    for (const [t, x, y] of L.ents) {
      if (!isEnt(t)) out.push(`level ${n}: unknown entity type '${t}' at ${x},${y}`);
      if (!(x >= 0 && y >= 0 && x < W && y < H)) out.push(`level ${n}: '${t}' at ${x},${y} is outside the ${W}x${H} play area`);
    }
  }
  return out;
}
