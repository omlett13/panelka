// The js/ files are classic scripts sharing one global scope (see CLAUDE.md), so each file is
// linted with every other file's top-level declarations as known globals. That keeps no-undef
// meaningful across files while still flagging typos. No formatting rules: the dense style is intentional.
import js from '@eslint/js';
import globals from 'globals';
import * as espree from 'espree';
import fs from 'node:fs';

const FILES = fs.readdirSync('js').filter(f => f.endsWith('.js')).map(f => 'js/' + f);

function topLevelNames(file) {
  const ast = espree.parse(fs.readFileSync(file, 'utf8'), { ecmaVersion: 'latest', sourceType: 'script' });
  const out = {};
  const pattern = (p, kind) => {
    if (!p) return;
    if (p.type === 'Identifier') out[p.name] = kind === 'const' ? 'readonly' : 'writable';
    else if (p.type === 'ArrayPattern') p.elements.forEach(e => pattern(e, kind));
    else if (p.type === 'ObjectPattern') p.properties.forEach(q => pattern(q.value || q.argument, kind));
    else if (p.type === 'RestElement') pattern(p.argument, kind);
    else if (p.type === 'AssignmentPattern') pattern(p.left, kind);
  };
  for (const n of ast.body) {
    if (n.type === 'VariableDeclaration') n.declarations.forEach(d => pattern(d.id, n.kind));
    else if ((n.type === 'FunctionDeclaration' || n.type === 'ClassDeclaration') && n.id) out[n.id.name] = 'writable';
  }
  return out;
}
const NAMES = Object.fromEntries(FILES.map(f => [f, topLevelNames(f)]));

export default [
  { ignores: ['dist/**', 'node_modules/**', 'Панелька.html'] },
  js.configs.recommended,
  {
    files: ['js/**/*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'script', globals: { ...globals.browser } },
    rules: {
      'no-unused-vars': ['error', { vars: 'local', args: 'none', caughtErrors: 'none' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  // per file: everything the other files declare at top level
  ...FILES.map(f => ({
    files: [f],
    languageOptions: { globals: Object.assign({}, ...FILES.filter(g => g !== f).map(g => NAMES[g])) },
  })),
  {
    files: ['*.mjs', 'eslint.config.js', 'test/*.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { ...globals.node } },
  },
  { files: ['test/maps.js'], languageOptions: { sourceType: 'script', globals: { LEVEL_SRC: 'readonly', TMAP: 'readonly', ZMAP: 'readonly', NPCS: 'readonly', PROPS: 'readonly', ITEMS: 'readonly', KINDS: 'readonly', MW: 'readonly', MH: 'readonly' } }, rules: { 'no-unused-expressions': 'off' } },
];
