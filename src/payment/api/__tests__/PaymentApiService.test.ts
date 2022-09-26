import { createPaymentRequest } from '../PaymentApiService';

describe('PaymentApiService', () => {
    describe('#createPaymentRequest()', () => {
        it('returns request resolved with response', async () => {
            const requestSpy = jest
                .fn()
                .mockResolvedValue({ ok: true, json: () => Promise.resolve('x') });
            const fn = createPaymentRequest(requestSpy);
            const payment = { iban: 'y', amount: '1' };

            const result = await fn(payment);

            expect(result).toBe('x');
            expect(requestSpy).toHaveBeenCalledWith('http://localhost:9000/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payment),
            });
        });
    });
});
