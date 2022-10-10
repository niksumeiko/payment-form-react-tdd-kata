import { createGenericContext } from '../common/context';
import type { NewPayment, Payment } from '../payment/PaymentService';

interface ApiAdapters {
    createPayment(payment: NewPayment): Promise<Payment>;
}

export const { useContext, createContextProvider: creatApiAdapters } =
    createGenericContext<ApiAdapters>();

export function useApiAdapters(): ApiAdapters {
    return useContext().value;
}
