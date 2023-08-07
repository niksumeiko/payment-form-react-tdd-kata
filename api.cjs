const http = require('http');
const { URL } = require('url');

function getRandomDelay() {
    return (Math.floor(Math.random() * 2) + 1) * 1000;
}

function writeResponse(res, data, statusCode) {
    res.writeHead(statusCode, headers);
    if (data) res.write(JSON.stringify(data));
    res.end();
}

function delayResponse(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), getRandomDelay());
    });
}

function writeSuccess(res, data) {
    writeResponse(res, data, 200);
}

function writeErrors(res, errors, statusCode = 500) {
    writeResponse(res, errors, statusCode);
}

function getRequestUrl(req) {
    return new URL(req.url, 'http://' + req.headers.host + '/');
}

function handleReceiverEndpoint(req, res) {
    const { searchParams } = getRequestUrl(req);
    const iban = searchParams.get('iban');

    if (!iban) {
        return writeErrors(res, [{
            scope: 'iban',
            message: 'Missing iban',
        }], 400);
    }

    if (iban === 'AT0309000000000019176655') {
        return writeSuccess(res, {
            isInternal: true,
        });
    }

    if (iban.startsWith('SK')) {
        return writeSuccess(res, {
            isInternal: true,
            bank: {
                name: 'Slovenská sporiteľňa',
                address: {
                    city: 'Bratislava',
                    country: 'SK'
                },
            },
        });
    }

    return writeSuccess(res, {
        isInternal: false,
        bank: {
            name: 'Santander Consumer Bank',
            address: {
                street: 'Schweglerstraße 26',
                zip: '1150',
                city: 'Vienna',
                country: 'AT'
            },
        },
    });
}

function getRequestPayload(req) {
    return new Promise((resolve) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk.toString();
        });
        req.on('end', () => {
            resolve(JSON.parse(data));
        });
    });
}

function handlePaymentEndpoint(req, res) {
    getRequestPayload(req)
        .then((body) => {
            const { amount } = body;

            if (typeof amount !== 'number' || amount === 0) {
                return writeErrors(res, [{
                    scope: 'amount',
                    message: 'Missing or mistyped amount',
                }], 400);
            }

            return delayResponse(body);
        })
        .then((body) => {
            const iban = body.iban.toUpperCase();

            writeSuccess(res, {
                iban,
                amount: body.amount,
                id: new Date().getTime().toString(),
                type: 'DOM',
            })
        });
}

const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
};

http.createServer((req, res) => {
    const { pathname } = getRequestUrl(req);

    if (req.method === 'OPTIONS') {
        return writeResponse(res, undefined, 204);
    }

    if (req.method === 'GET') {
        if (pathname === '/receiver') {
            return handleReceiverEndpoint(req, res);
        }
    }

    if (req.method === 'POST') {
        if (pathname === '/pay') {
            return handlePaymentEndpoint(req, res);
        }
    }

    writeErrors(res, [{ message: 'Not found' }], 404)
}).listen(9000, () => console.info('API ready/started'));
