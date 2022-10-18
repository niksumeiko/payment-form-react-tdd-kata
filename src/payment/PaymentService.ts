export interface Payment {
    id: string;
    iban: string;
    bic?: string;
    amount: string;
    type: 'DOM';
}

export type NewPayment = Omit<Payment, 'id' | 'type'>;

const IBAN_COUNTRY_CODE_LENGTH = 2;
const DOMESTIC_COUNTRY_CODE = 'SK';

export function isDomesticPayment({ iban }: Pick<NewPayment, 'iban'>): boolean {
    if (!iban) {
        return true;
    }

    if (iban.length < IBAN_COUNTRY_CODE_LENGTH) {
        return true;
    }

    return iban.startsWith(DOMESTIC_COUNTRY_CODE);
}
