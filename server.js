#!/usr/bin/env node
/**
 * TrailMind — Minimal static file server
 * Serves the public/ directory on http://localhost:3000
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  // Security: prevent path traversal
  const safePath = path.normalize(req.url.split('?')[0]);
  let filePath = path.join(PUBLIC_DIR, safePath);

  // Default to index.html for directories
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Fallback to index.html for SPA routing
  if (!fs.existsSync(filePath)) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // CORS headers (needed for Service Worker scope)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Service-Worker-Allowed', '/');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n🌿 TrailMind running at http://localhost:${PORT}\n`);
  console.log(`   Prerequisites:`);
  console.log(`   1. Install Ollama: https://ollama.com`);
  console.log(`   2. Pull a vision model: ollama pull llama3.2-vision`);
  console.log(`   3. Run with CORS enabled: OLLAMA_ORIGINS=* ollama serve\n`);
});
