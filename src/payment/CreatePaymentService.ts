import type { NewPayment, Payment } from './PaymentService';

export interface PaymentMutation {
    createPayment(payment: NewPayment): void;
    reset(): void;
    payment?: Payment;
    hasPaymentFailed: boolean;
    wasPaymentCreated: boolean;
    isPaying: boolean;
}

export function isPaymentAvailable(
    mutation: PaymentMutation,
): mutation is Required<PaymentMutation> {
    return mutation.wasPaymentCreated;
}
