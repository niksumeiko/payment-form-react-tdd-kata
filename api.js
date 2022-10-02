const http = require('http');

const url = require('url');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const { pathname } = url.parse(req.url, true);

    if (req.method === 'GET') {
        if (pathname === '/') {
            res.write('API works');
            res.end();
        }
    } else if (req.method === 'POST') {
        if (pathname === '/pay') {
            res.write('hello world');
            res.end();
        }
    }
});

server.listen(9000);
