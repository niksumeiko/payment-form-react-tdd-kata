import { isDomesticPayment } from '../PaymentService';

describe('PaymentService', () => {
    describe('#isDomesticPayment()', () => {
        it('returns true when payment is default', () => {
            const payment = { iban: '' };

            const result = isDomesticPayment(payment);

            expect(result).toBe(true);
        });

        it('returns true when payment is unknown', () => {
            const payment = { iban: 'X' };

            const result = isDomesticPayment(payment);

            expect(result).toBe(true);
        });

        it('returns true when payment is domestic', () => {
            const payment = { iban: 'SK123' };

            const result = isDomesticPayment(payment);

            expect(result).toBe(true);
        });

        it('returns false when payment is international', () => {
            const payment = { iban: 'AT123' };

            const result = isDomesticPayment(payment);

            expect(result).toBe(false);
        });
    });
});
