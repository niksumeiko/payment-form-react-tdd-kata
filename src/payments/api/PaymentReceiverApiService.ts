import type { Request } from '../../api/ApiService';
import { getValidApiResponse } from '../../api/ApiService';
import type { PaymentFormValues } from '../useCases/createPayment/CreatePaymentService';

export interface PaymentReceiverDto {
    isInternal: boolean;
    bank?: {
        name?: string;
        address?: {
            street?: string;
            zip?: string;
            city?: string;
            country?: string;
        };
    };
}

interface InputProps {
    receiver: Partial<{
        iban: PaymentFormValues['iban'];
    }>;
}

interface Options {
    request?: Request;
}

export function createPaymentReceiverRequest(
    { receiver: { iban } }: InputProps,
    options?: Options,
) {
    const request = options?.request ?? window.fetch;

    return async () => {
        const response = await request(`http://localhost:9000/receiver?iban=${iban}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return getValidApiResponse<PaymentReceiverDto>(response);
    };
}
