// Minimal static file server for local play and tests: node serve.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.mp3': 'audio/mpeg' };

export function serve(port = 0) {
  return http.createServer((req, res) => {
    let p = path.join(ROOT, path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (!p.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
    if (p.endsWith(path.sep)) p += 'index.html';
    fs.readFile(p, (err, buf) => {
      if (err) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(buf);
    });
  }).listen(port, '127.0.0.1');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const s = serve(+process.argv[2] || 8080);
  s.on('listening', () => console.log(`http://127.0.0.1:${s.address().port}/`));
}
