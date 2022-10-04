import type { NewPayment, Payment } from './PaymentService';

export async function createPayment(payment: NewPayment): Promise<Payment> {
    const response = await fetch('http://localhost:9000/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
    });

    if (!response.ok) {
        throw await response.json();
    }

    return response.json();
}
