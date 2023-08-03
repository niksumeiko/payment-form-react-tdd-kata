const http = require('http');
const url = require('url');

function getRandomDelay() {
    return (Math.floor(Math.random() * 2) + 1) * 1000;
}

let myAccountBalance = 100000;

http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };

    const { pathname } = url.parse(req.url, true);

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (req.method === 'POST') {
        if (pathname === '/pay') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk.toString();
            });
            req.on('end', () => {
                const body = JSON.parse(data);
                const { amount } = body;
                const iban = body.iban.toUpperCase();
                const newBalance = myAccountBalance - amount;

                if (amount === 0) {
                    res.writeHead(400, headers);
                    res.write(JSON.stringify([{ scope: 'amount', message: 'Missing amount' }]));
                    res.end();
                    return;
                }

                // if (newBalance < 0) {
                //     res.writeHead(406, headers);
                //     res.write(JSON.stringify([{ scope: 'amount', message: 'Not enough funds' }]));
                //     res.end();
                //     return;
                // }

                myAccountBalance = newBalance;

                setTimeout(() => {
                    res.writeHead(200, headers);
                    res.write(
                        JSON.stringify({
                            ...body,
                            iban,
                            amount,
                            id: new Date().getTime().toString(),
                            type: 'DOM',
                        }),
                    );
                    res.end();
                }, getRandomDelay());
            });
            return;
        }
    }

    res.writeHead(404, headers);
    res.end();
}).listen(9000, () => console.info('API ready/started'));
