import type { Request } from '../../api/ApiService';
import { getValidApiResponse } from '../../api/ApiService';
import type { ApiAdapters } from '../../api/ApiAdapters';
import type { Payment } from '../PaymentService';

export function createPaymentRequest(request: Request): ApiAdapters['createPayment'] {
    return async (payment) => {
        const response = await request('http://localhost:9000/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payment),
        });

        return getValidApiResponse<Payment>(response);
    };
}
