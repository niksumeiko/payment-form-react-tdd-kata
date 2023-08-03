import { useMutation } from '@tanstack/react-query';

import { createPaymentRequest } from '../../api/PaymentApiService';
import type { PaymentFormValues } from './CreatePaymentService';
import { createNewPaymentDto } from './CreatePaymentService';

interface HookResult {
    createPayment(values: PaymentFormValues): void;
    wasPaymentCreated: boolean;
}

export function useCreatePayment(): HookResult {
    const mutation = useMutation(createPaymentRequest());

    const createPayment = (values: PaymentFormValues) => {
        mutation.mutate(createNewPaymentDto(values));
    };

    return {
        createPayment,
        wasPaymentCreated: mutation.isSuccess,
    };
}
