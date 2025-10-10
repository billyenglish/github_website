import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const PORT = process.env.PORT;

const __filenamePath = fileURLToPath(import.meta.url);
const __dirnamePath = path.dirname(__filenamePath);

const currentServer = http.createServer(async (req, res) => {

    const currentDirPath = path.join(__dirnamePath, 'views');
    let currentFile;

    try {
        if (req.url === '/' && req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            currentFile = 'index.html';
        } else if (req.url === '/about' && req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            currentFile = 'about.html';
        } else if (req.url === '/contact-me' && req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            currentFile = 'contact-me.html'
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html')
        }

        const currentFilePath = path.join(currentDirPath, currentFile);
        const currentFileData = await fs.readFile(currentFilePath, 'utf-8');
        res.end(currentFileData);

    } catch (err) {
        console.error(`Error`);
    }

});

currentServer.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});
