import { describe, expect, it, vi } from 'vitest';

import { createPaymentRequest } from '../PaymentApiService';

describe('PaymentApiService', () => {
    it('make request and return payment', async () => {
        const payment = { iban: 'x', amount: 1 };
        const spy = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        ...payment,
                        id: 'y',
                    }),
            } as Response),
        );

        const result = await createPaymentRequest(spy)(payment);

        expect(spy).toHaveBeenCalledWith('http://localhost:9000/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{"iban":"x","amount":1}',
        });
        expect(result).toEqual({
            id: 'y',
            iban: 'x',
            amount: 1,
        });
    });
});
