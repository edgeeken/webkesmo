const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.css': 'text/css'
};

const server = http.createServer((req, res) => {
    let url = req.url === '/' ? '/index.html' : req.url;
    url = url.split('?')[0];
    const filePath = path.join(process.cwd(), url);
    const ext = path.extname(filePath);

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain' });
            res.end(content);
        }
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://192.168.110.43:${port}/`);
});
