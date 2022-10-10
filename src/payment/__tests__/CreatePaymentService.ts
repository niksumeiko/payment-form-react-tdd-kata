import type { PaymentMutation } from '../CreatePaymentService';
import { isPaymentAvailable } from '../CreatePaymentService';

describe('CreatePaymentService', () => {
    describe('#isPaymentAvailable()', () => {
        it("returns false when payment wasn't created", () => {
            const mutation = { wasPaymentCreated: false } as PaymentMutation;

            const result = isPaymentAvailable(mutation);

            expect(result).toBe(false);
        });

        it('returns true when payment was created', () => {
            const mutation = { wasPaymentCreated: true } as PaymentMutation;

            const result = isPaymentAvailable(mutation);

            expect(result).toBe(true);
        });
    });
});
