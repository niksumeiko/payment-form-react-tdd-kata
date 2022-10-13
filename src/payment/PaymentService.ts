import type { Iban } from './IbanService';
import { IBAN_COUNTRY_CODE_LENGTH } from './IbanService';

export interface Payment {
    id: string;
    iban: Iban;
    bic?: string;
    amount: string;
    type: 'DOM' | 'INT';
}

export type NewPayment = Omit<Payment, 'id' | 'type'>;

export function isDomesticPayment({ iban }: Pick<NewPayment, 'iban'>): boolean {
    if (!iban) {
        return true;
    }

    if (iban.length < IBAN_COUNTRY_CODE_LENGTH) {
        return true;
    }

    return iban.startsWith('SK');
}
