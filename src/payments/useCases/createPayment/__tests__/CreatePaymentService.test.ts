import { describe, expect, it } from 'vitest';

import { createNewPaymentDto } from '../CreatePaymentService';

describe('CreatePaymentService', () => {
    describe('payment form values to dto conversion', () => {
        it('return payment dto', () => {
            const values = { iban: 'x', amount: '1' };

            const result = createNewPaymentDto(values);

            expect(result).toEqual({
                iban: 'x',
                amount: 1,
            });
        });
    });
});
