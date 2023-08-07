import { describe, expect, it } from 'vitest';

import { createPaymentReceiverDescription } from '../PaymentReceiverService';

describe('PaymentReceiverService', () => {
    describe('retrieve payment receiver details', () => {
        it('returns undefined when details are unavailable', () => {
            const details = undefined;

            const result = createPaymentReceiverDescription(details);

            expect(result).toBeUndefined();
        });

        it('returns undefined when receiver is external and bank is unavailable', () => {
            const details = {
                isInternal: false,
                bank: undefined,
            };

            const result = createPaymentReceiverDescription(details);

            expect(result).toBeUndefined();
        });

        it('returns details when receiver is internal', () => {
            const details = { isInternal: true };

            const result = createPaymentReceiverDescription(details);

            expect(result).toBe('Same bank transfer · Money arrives immediately');
        });

        it('returns details when receiver is external and eligible for instant payment', () => {
            const details = {
                isInternal: true,
                bank: {
                    name: 'Slovenská sporiteľňa',
                    address: {
                        city: 'Bratislava',
                        country: 'SK',
                    },
                },
            };

            const result = createPaymentReceiverDescription(details);

            expect(result).toBe('Slovenská sporiteľňa, Bratislava, SK · Money arrives immediately');
        });

        it('returns details when receiver is external and bank is available', () => {
            const details = {
                isInternal: false,
                bank: {
                    name: 'Santander Consumer Bank',
                    address: {
                        street: 'Schweglerstraße 26',
                        city: 'Vienna',
                        zip: '1150',
                        country: 'AT',
                    },
                },
            };

            const result = createPaymentReceiverDescription(details);

            expect(result).toBe('Santander Consumer Bank, Schweglerstraße 26, 1150 Vienna, AT');
        });
    });
});
