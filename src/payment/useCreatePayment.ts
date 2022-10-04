import { useMutation } from '@tanstack/react-query';

import { createPayment } from './PaymentService';
import type { PaymentMutation } from './CreatePaymentService';

export function useCreatePayment(): PaymentMutation {
    const mutation = useMutation(createPayment);
    const {
        mutate,
        reset,
        data: payment,
        isError: hasPaymentFailed,
        isSuccess: wasPaymentCreated,
        isLoading: isPaying,
    } = mutation;

    return {
        createPayment: mutate,
        reset,
        hasPaymentFailed,
        isPaying,
        payment,
        wasPaymentCreated,
    };
}
