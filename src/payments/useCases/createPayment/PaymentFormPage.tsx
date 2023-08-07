import type { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { Button, Feedback } from '../../../design-system';
import { useCreatePayment } from './useCreatePayment';
import type { PaymentFormValues } from './CreatePaymentService';
import { PaymentFormLayout } from './PaymentFormLayout';
import { IbanFormField } from './IbanFormField';
import { AmountFormField } from './AmountFormField';

export const PaymentFormPage: FC = () => {
    const { createPayment, wasPaymentCreated } = useCreatePayment();
    const methods = useForm<PaymentFormValues>({
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
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(createPayment)} autoComplete="off">
                    <IbanFormField />
                    <AmountFormField />
                    <div>
                        <Button data-test="submit-cta" type="submit">
                            Make payment
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </PaymentFormLayout>
    );
};
