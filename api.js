const http = require('http');

const url = require('url');

let myAccountBalance = 100000;

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
        switch (pathname) {
            case '/my/account':
                res.writeHead(200, headers);
                res.write(
                    JSON.stringify({
                        balance: myAccountBalance,
                        name: 'Main account',
                    }),
                );
                res.end();
                break;
            case '/':
                res.writeHead(200, headers);
                res.end('API works');
                break;
        }
    } else if (req.method === 'POST') {
        if (pathname === '/pay') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk.toString();
            });
            req.on('end', () => {
                const body = JSON.parse(data);
                const amount = Math.abs(body.amount);
                const newBalance = myAccountBalance - amount;

                if (amount === 0) {
                    res.writeHead(400, headers);
                    res.write(JSON.stringify([{ scope: 'amount', message: 'Missing amount' }]));
                    res.end();
                    return;
                }

                if (newBalance < 0) {
                    res.writeHead(406, headers);
                    res.write(JSON.stringify([{ scope: 'amount', message: 'Not enough funds' }]));
                    res.end();
                    return;
                }

                myAccountBalance = newBalance;
                res.writeHead(200, headers);
                res.write(
                    JSON.stringify({
                        ...body,
                        amount,
                        id: new Date().getTime().toString(),
                        type: body.bic ? 'INTERNATIONAL' : 'DOMESTIC',
                    }),
                );
                res.end();
            });
        }
    }
}).listen(9000);
