export interface Payment {
    id: string;
    iban: string;
    amount: string;
    type: 'DOMESTIC';
}

export type NewPayment = Omit<Payment, 'id'>;

export async function createPayment(payment: NewPayment): Promise<Payment> {
    const response = await fetch('http://localhost:9000/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
    });

    return response.json();
}
