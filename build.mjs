// Inlines style.css, js/*.js and audio/*.mp3 into a single self-contained dist/Панелька.html.
import fs from 'node:fs';

const read = p => fs.readFileSync(p, 'utf8');
const dataUrl = p => 'data:audio/mpeg;base64,' + fs.readFileSync(p).toString('base64');

let html = read('index.html');
html = html.replace('<link rel="stylesheet" href="style.css">', () => '<style>\n' + read('style.css') + '</style>');
html = html.replace(/<script src="(js\/[\w-]+\.js)"><\/script>/g, (_, p) => {
  let js = read(p);
  if (p === 'js/audio.js') js = js.replace(/'(audio\/\w+\.mp3)'/g, (_, a) => `'${dataUrl(a)}'`);
  if (/<\/script/i.test(js)) throw new Error(p + ' contains </script');
  return '<script>\n' + js + '</script>';
});
if (/src="js\/|href="style\.css"/.test(html)) throw new Error('unresolved local reference');

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/Панелька.html', html);
console.log('dist/Панелька.html', (html.length / 1048576).toFixed(2) + ' MB');
