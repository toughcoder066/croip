import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'docs', 'CROIP API reference.html');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  // Global CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Proxy requests: /proxy/:port/* -> http://127.0.0.1::port/*
  if (url.pathname.startsWith('/proxy/')) {
    const parts = url.pathname.slice('/proxy/'.length).split('/');
    const targetPort = parts[0];
    let cleanTargetPath = '/' + parts.slice(1).join('/');
    if (cleanTargetPath.startsWith('/api/v1/')) {
      cleanTargetPath = cleanTargetPath.replace('/api/v1/', '/v1/');
    } else if (cleanTargetPath.startsWith('/api/')) {
      cleanTargetPath = cleanTargetPath.replace('/api/', '/');
    }
    const targetPath = cleanTargetPath + url.search;

    const proxyOptions = {
      hostname: '127.0.0.1',
      port: Number(targetPort),
      path: targetPath,
      method: req.method,
      headers: {
        ...req.headers,
        host: `127.0.0.1:${targetPort}`
      }
    };

    delete proxyOptions.headers['content-length'];

    const proxyReq = http.request(proxyOptions, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Proxy Error',
        message: err.message,
        hint: `Service on port ${targetPort} may be offline or starting up.`
      }));
    });

    req.pipe(proxyReq);
    return;
  }

  // Health / ping
  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'croip-api-portal' }));
    return;
  }

  // Serve CROIP API reference.html
  if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/portal') {
    fs.readFile(htmlPath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading API reference: ' + err.message);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    });
    return;
  }

  // Static files in docs or public
  const safePath = path.normalize(url.pathname).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(rootDir, safePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.pdf': 'application/pdf',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // Default fallback to API Reference
  fs.readFile(htmlPath, 'utf8', (err, content) => {
    if (!err) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n==================================================`);
  console.log(`🚀 CROIP API Portal & Workbench is running!`);
  console.log(`🌐 Local URL:  http://localhost:${PORT}`);
  console.log(`📖 Document:   docs/CROIP API reference.html`);
  console.log(`🛡️  Scope Rule: Concessions cannot bill outside scope`);
  console.log(`==================================================\n`);
});
