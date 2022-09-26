export interface Payment {
    id: string;
    iban: string;
    amount: string;
    type: 'DOM';
}

export type NewPayment = Omit<Payment, 'id' | 'type'>;
