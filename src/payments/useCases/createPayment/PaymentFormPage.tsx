import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { useCreatePayment } from './useCreatePayment';
import type { PaymentFormValues } from './CreatePaymentService';
import { PaymentFormLayout } from './PaymentFormLayout';
import { Button, Feedback, FormField, TextInput } from '../../../design-system';

export const PaymentFormPage: FC = () => {
    const { createPayment, wasPaymentCreated } = useCreatePayment();
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<PaymentFormValues>({
        resolver: yupResolver(
            object({
                iban: string().required('Missing IBAN'),
            }),
        ),
        defaultValues: {
            iban: '',
            amount: '',
        },
    });

    if (wasPaymentCreated) {
        return <Feedback>A payment succeed!</Feedback>;
    }

    return (
        <PaymentFormLayout>
            <form onSubmit={handleSubmit(createPayment)} autoComplete="off">
                <FormField
                    label="Recipient (IBAN)"
                    error={errors.iban?.message}
                    renderInput={(labelReference) => (
                        <TextInput<PaymentFormValues>
                            name="iban"
                            data-test="iban-entry"
                            labelReference={labelReference}
                            register={register}
                        />
                    )}
                />
                <FormField
                    label="Amount"
                    renderInput={(labelReference) => (
                        <TextInput<PaymentFormValues>
                            name="amount"
                            data-test="amount-entry"
                            labelReference={labelReference}
                            register={register}
                        />
                    )}
                />
                <div>
                    <Button data-test="submit-cta" type="submit">
                        Make payment
                    </Button>
                </div>
            </form>
        </PaymentFormLayout>
    );
};
