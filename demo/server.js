#!/usr/bin/env node

/**
 * Simple HTTP server for The Graph Client demo
 */

import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;

const server = createServer((req, res) => {
  try {
    // Serve the demo HTML file
    if (req.url === '/' || req.url === '/index.html') {
      const html = readFileSync(join(__dirname, 'index.html'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }
    
    // 404 for other paths
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`🚀 The Graph Client Demo Server running at:`);
  console.log(`   http://localhost:${port}`);
  console.log(`\n💡 Open this URL in your browser to see the demo`);
  console.log(`🤖 You can also use Playwright MCP to automate browser interactions\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});