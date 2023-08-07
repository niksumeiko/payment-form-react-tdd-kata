import type { NewPaymentDto } from '../../api/PaymentApiService';

export interface PaymentFormValues {
    iban: string;
    amount?: string;
}

export function createNewPaymentDto(values: PaymentFormValues): NewPaymentDto {
    return {
        iban: values.iban,
        amount: Number(values.amount),
    };
}
