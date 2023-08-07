import type { Request } from '../../api/ApiService';
import { getValidApiResponse } from '../../api/ApiService';

export interface ExistingPaymentDto {
    id: string;
    iban: string;
    amount: number;
}

export type NewPaymentDto = Omit<ExistingPaymentDto, 'id'>;

export function createPaymentRequest(request: Request = window.fetch) {
    return async (payment: NewPaymentDto) => {
        const response = await request('http://localhost:9000/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payment),
        });

        return getValidApiResponse<ExistingPaymentDto>(response);
    };
}
