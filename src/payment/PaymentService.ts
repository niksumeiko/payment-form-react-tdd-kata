export interface Payment {
    id: string;
    iban: string;
    amount: string;
    type: 'DOMESTIC';
}

export type NewPayment = Omit<Payment, 'id'>;
