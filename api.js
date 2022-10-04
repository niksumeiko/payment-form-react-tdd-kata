const http = require('http');

const url = require('url');

http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };

    const { pathname } = url.parse(req.url, true);

    // eslint-disable-next-line no-console
    console.log(req.method, pathname);

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (req.method === 'GET') {
        if (pathname === '/') {
            res.writeHead(200, headers);
            res.end('API works');
        }
    } else if (req.method === 'POST') {
        if (pathname === '/pay') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk.toString();
            });
            req.on('end', () => {
                const body = JSON.parse(data);
                body.id = new Date().getTime();
                body.type = body.bic ? 'INTERNATIONAL' : 'DOMESTIC';

                res.writeHead(200, headers);
                res.write(JSON.stringify(body));
                res.end();
            });
        }
    }
}).listen(9000);
