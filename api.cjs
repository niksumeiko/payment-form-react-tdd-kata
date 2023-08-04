const http = require('http');
const { URL } = require('url');

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

    const url = new URL(req.url, 'http://' + req.headers.host + '/');
    const { pathname, searchParams } = url;

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (req.method === 'GET') {
        if (pathname === '/receiver') {
            let iban = searchParams.get('iban');

            if (!iban) {
                res.writeHead(400, headers);
                res.write(JSON.stringify([{ scope: 'iban', message: 'Missing iban' }]));
                res.end();
                return;
            }

            if (iban === 'AT0309000000000019176655') {
                res.writeHead(200, headers);
                res.write(
                    JSON.stringify({
                        isInternal: true,
                    }),
                );
                res.end();
                return;
            }

            if (iban.startsWith('SK')) {
                res.writeHead(200, headers);
                res.write(
                    JSON.stringify({
                        isInternal: true,
                        bank: {
                            name: 'Slovenská sporiteľňa',
                            address: {
                                city: 'Bratislava',
                                country: 'SK'
                            },
                        },
                    }),
                );
                res.end();
                return;
            }

            res.writeHead(200, headers);
            res.write(
                JSON.stringify({
                    bank: {
                        name: 'Santander Consumer Bank',
                        address: {
                            street: 'Schweglerstraße 26',
                            zip: '1150',
                            city: 'Vienna',
                            country: 'AT'
                        },
                    },
                }),
            );
            res.end();
        }
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
                return;
            });
        }
    }

    res.writeHead(404, headers);
    res.end();
}).listen(9000, () => console.info('API ready/started'));
