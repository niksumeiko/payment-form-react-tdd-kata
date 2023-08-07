import { describe, expect, it, vi } from 'vitest';

import { createPaymentReceiverRequest } from '../PaymentReceiverApiService';

describe('PaymentReceiverApiService', () => {
    it('make request and return payment', async () => {
        const input = { receiver: { iban: 'x' } };
        const spy = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        isInternal: false,
                        bank: { name: 'y' },
                    }),
            } as Response),
        );

        const result = await createPaymentReceiverRequest(input, { request: spy })();

        expect(spy).toHaveBeenCalledWith('http://localhost:9000/receiver?iban=x', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        expect(result).toEqual({
            isInternal: false,
            bank: { name: 'y' },
        });
    });
});
