import { getSuccessMessage } from '../PaymentFormService';
import { Payment } from 'src/payment/PaymentService';

describe('PaymentFormService', () => {
    describe('#getSuccessMessage()', () => {
        it('returns message when created payment is domestic', () => {
            const payment: Pick<Payment, 'type'> = { type: 'DOM' };

            const result = getSuccessMessage(payment);

            expect(result).toBe('A domestic payment succeed!');
        });

        it('returns message when created payment is international', () => {
            const payment: Pick<Payment, 'type'> = { type: 'INT' };

            const result = getSuccessMessage(payment);

            expect(result).toBe('An international payment succeed!');
        });
    });
});
