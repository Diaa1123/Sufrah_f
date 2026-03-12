#!/usr/bin/env node
/**
 * Development Server with CORS Support
 * Solves CORS issues when developing Salla themes locally
 *
 * @package Sufrah Restaurant Theme
 * @version 1.0.0
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Color console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

console.log(`${colors.blue}
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🍽️  Sufrah Restaurant Theme - Development Server       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}`);

// Check if public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  console.error(`${colors.red}❌ Error: public/ directory not found!${colors.reset}`);
  console.log(`${colors.yellow}💡 Run 'pnpm run build' first to generate assets${colors.reset}\n`);
  process.exit(1);
}

// CORS Middleware - Allow all origins
app.use((req, res, next) => {
  // Allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// MIME Type Middleware - Set correct content types
app.use((req, res, next) => {
  const ext = path.extname(req.url).toLowerCase();

  // Set correct MIME types
  const mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf',
    '.map': 'application/json',
  };

  if (mimeTypes[ext]) {
    res.setHeader('Content-Type', mimeTypes[ext]);
  }

  next();
});

// Cache Control Middleware
app.use((req, res, next) => {
  // Disable caching for development
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.header('Expires', '0');
  res.header('Pragma', 'no-cache');
  next();
});

// Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString('ar-SA', { hour12: false });
  const method = req.method.padEnd(7);
  const url = req.url;

  console.log(`${colors.blue}[${timestamp}]${colors.reset} ${method} ${url}`);
  next();
});

// Serve static files from public directory
app.use(express.static(PUBLIC_DIR, {
  setHeaders: (res, filePath) => {
    // Additional headers for specific file types
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.js') {
      res.setHeader('X-Content-Type-Options', 'nosniff');
    }
  }
}));

// 404 Handler
app.use((req, res) => {
  console.log(`${colors.red}❌ 404 Not Found:${colors.reset} ${req.url}`);
  res.status(404).send(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 - الملف غير موجود</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .container {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        h1 { font-size: 6rem; margin-bottom: 1rem; }
        h2 { font-size: 2rem; margin-bottom: 1rem; }
        p { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
        code {
          background: rgba(0, 0, 0, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          display: inline-block;
          font-family: 'Courier New', monospace;
        }
        .tip {
          background: rgba(255, 255, 255, 0.2);
          padding: 1rem;
          border-radius: 10px;
          margin-top: 2rem;
          text-align: right;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>404</h1>
        <h2>الملف غير موجود</h2>
        <p>الملف المطلوب غير موجود في مجلد public</p>
        <code>${req.url}</code>
        <div class="tip">
          <strong>💡 نصيحة:</strong><br>
          تأكد من بناء القالب أولاً باستخدام:<br>
          <code>pnpm run build</code>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(`${colors.red}❌ Error:${colors.reset}`, err.message);
  res.status(500).send('Internal Server Error');
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
${colors.green}✅ Development server started successfully!${colors.reset}

${colors.blue}📍 Server Information:${colors.reset}
   Local:    http://localhost:${PORT}
   Network:  http://0.0.0.0:${PORT}

${colors.blue}📁 Serving Files From:${colors.reset}
   ${PUBLIC_DIR}

${colors.blue}🔧 Features Enabled:${colors.reset}
   ✅ CORS enabled (all origins)
   ✅ Correct MIME types
   ✅ No caching (dev mode)
   ✅ Request logging

${colors.yellow}💡 Usage Tips:${colors.reset}
   • Use with Salla Design: https://salla.design
   • Automatic reload on file changes
   • Press Ctrl+C to stop server

${colors.green}🍽️  Happy Coding!${colors.reset}
`);

  // List available files
  try {
    const files = fs.readdirSync(PUBLIC_DIR);
    console.log(`${colors.blue}📦 Available Files (${files.length}):${colors.reset}`);
    files.forEach(file => {
      const stat = fs.statSync(path.join(PUBLIC_DIR, file));
      const size = (stat.size / 1024).toFixed(2);
      console.log(`   • ${file.padEnd(30)} (${size} KB)`);
    });
    console.log('');
  } catch (err) {
    console.error(`${colors.red}❌ Could not read public directory${colors.reset}`);
  }
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}⚠️  Shutting down server...${colors.reset}`);
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(`\n${colors.yellow}⚠️  Shutting down server...${colors.reset}`);
  process.exit(0);
});
