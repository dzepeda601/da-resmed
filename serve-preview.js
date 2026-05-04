const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const WORKSPACE = __dirname;

const mimeTypes = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.woff': 'font/woff',
};

http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/' || url === '/index.html') {
    const plainHtml = fs.readFileSync(path.join(WORKSPACE, 'content/index.plain.html'), 'utf8');
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Resmed | The World Leader in Sleep Health</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <script src="/scripts/aem.js" type="module"></script>
  <script src="/scripts/scripts.js" type="module"></script>
  <link rel="stylesheet" href="/styles/styles.css">
</head>
<body>
  <header></header>
  <main>${plainHtml}</main>
  <footer></footer>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' });
    res.end(html);
    return;
  }

  // Try the file path directly
  let filePath = path.join(WORKSPACE, url);

  // If not found and no extension, try .plain.html (for content paths)
  if (!fs.existsSync(filePath) && !path.extname(url)) {
    const plainPath = path.join(WORKSPACE, 'content', url + '.plain.html');
    if (fs.existsSync(plainPath)) {
      filePath = plainPath;
    }
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end('Not found: ' + url);
    return;
  }

  const ext = path.extname(filePath);
  res.writeHead(200, {
    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(fs.readFileSync(filePath));
}).listen(PORT, () => console.log('ResMed preview at http://localhost:' + PORT));
