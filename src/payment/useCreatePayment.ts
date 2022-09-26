import { useMutation } from '@tanstack/react-query';

import { createPaymentRequest } from './api/PaymentApiService';
import type { PaymentMutation } from './CreatePaymentService';

export function useCreatePayment(): PaymentMutation {
    const mutation = useMutation(createPaymentRequest(window.fetch));

    return {
        createPayment: mutation.mutate,
        reset: mutation.reset,
        hasPaymentFailed: mutation.isError,
        isPaying: mutation.isLoading,
        payment: mutation.data,
        wasPaymentCreated: mutation.isSuccess,
    };
}
