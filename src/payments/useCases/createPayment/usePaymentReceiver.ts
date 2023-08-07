import { useQuery } from '@tanstack/react-query';

import { createPaymentReceiverRequest } from '../../api/PaymentReceiverApiService';
import type { PaymentFormValues } from './CreatePaymentService';
import { createPaymentReceiverDescription } from './PaymentReceiverService';

interface HookOptions {
    iban?: PaymentFormValues['iban'];
}

export function usePaymentReceiver(receiver: HookOptions) {
    const { data } = useQuery(
        ['receiver', receiver.iban],
        createPaymentReceiverRequest({ receiver }),
        {
            enabled: Boolean(receiver.iban),
        },
    );

    return {
        details: createPaymentReceiverDescription(data),
    };
}
