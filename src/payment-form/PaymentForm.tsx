/* eslint-disable george/jsx-no-inline-styles */
import type { FC } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

interface FormData {
    iban: string;
    amount: number;
}

const FORM_VALIDATION_SCHEMA = object({
    iban: string().required('Missing IBAN'),
});

export const PaymentForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(FORM_VALIDATION_SCHEMA),
    });
    const onSubmit = (values: FormData) => {
        // eslint-disable-next-line no-console
        console.log(values);
    };

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

            <button type="submit">Pay</button>
        </form>
    );
};
