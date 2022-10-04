import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPayment } from './PaymentApiService';
import type { PaymentMutation } from './CreatePaymentService';

export function useCreatePayment(): PaymentMutation {
    const queryClient = useQueryClient();
    const mutation = useMutation(createPayment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['my/account']);
        },
    });

    return {
        createPayment: mutation.mutate,
        reset: mutation.reset,
        hasPaymentFailed: mutation.isError,
        isPaying: mutation.isLoading,
        payment: mutation.data,
        wasPaymentCreated: mutation.isSuccess,
    };
}
