/* eslint-disable george/jsx-no-inline-styles */
import type { FC } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import type { NewPayment } from './PaymentService';
import { isPaymentAvailable } from './CreatePaymentService';
import { useCreatePayment } from './useCreatePayment';

const FORM_VALIDATION_SCHEMA = object({
    iban: string().required('Missing IBAN'),
});

export const PaymentForm: FC = () => {
    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: { errors },
    } = useForm<NewPayment>({
        resolver: yupResolver(FORM_VALIDATION_SCHEMA),
    });
    const mutation = useCreatePayment();
    const onSubmit = (values: NewPayment) => {
        mutation.createPayment(values);
    };
    const onReset = () => {
        resetForm();
        mutation.reset();
    };

    if (isPaymentAvailable(mutation)) {
        const { payment } = mutation;

        return (
            <div data-test="payment-success">
                <h3>A {payment.type} payment succeed!</h3>
                <p>
                    €{payment.amount} have been sent to {payment.iban}
                </p>
                <div>
                    <button onClick={onReset} type="button">
                        New payment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div>
                <label htmlFor="iban">Recipient (IBAN)</label>
                <input {...register('iban')} id="iban" data-test="iban" />
                {errors.iban && (
                    <p
                        style={{
                            margin: '0.5rem 0 1rem',
                            background: 'rgba(255, 0, 0, 0.1)',
                            border: 'solid 1px red',
                            padding: '0.25rem',
                        }}
                    >
                        {errors.iban.message}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                <input {...register('amount')} placeholder="0,00" data-test="amount" />
            </div>

            <button type="submit" disabled={mutation.isPaying}>
                Pay
            </button>
        </form>
    );
};
