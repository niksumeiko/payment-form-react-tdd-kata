import { useMutation } from '@tanstack/react-query';

import { useApiAdapters } from '../api/ApiAdapters';
import type { PaymentMutation } from './CreatePaymentService';

export function useCreatePayment(): PaymentMutation {
    const { createPayment } = useApiAdapters();
    const mutation = useMutation(createPayment);

    return {
        createPayment: mutation.mutate,
        reset: mutation.reset,
        hasPaymentFailed: mutation.isError,
        isPaying: mutation.isLoading,
        payment: mutation.data,
        wasPaymentCreated: mutation.isSuccess,
    };
}
