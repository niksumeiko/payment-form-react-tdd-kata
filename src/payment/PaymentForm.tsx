import type { FC } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useCreatePayment } from './useCreatePayment';
import styles from '../App.module.scss';
import { isPaymentAvailable } from './CreatePaymentService';
import type { NewPayment } from './PaymentService';
import { PAYMENT_FORM_OPTIONS } from './PaymentFormService';

export const PaymentForm: FC = () => {
    const mutation = useCreatePayment();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPayment>(PAYMENT_FORM_OPTIONS);

    if (isPaymentAvailable(mutation)) {
        return (
            <div data-test="payment-success">
                <h3>A payment succeed!</h3>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(mutation.createPayment)} autoComplete="off">
            <div className={styles.formInputField}>
                <label htmlFor="iban" className={styles.formLabel}>
                    Recipient (IBAN)
                </label>
                <input
                    {...register('iban')}
                    id="iban"
                    className={styles.formInput}
                    data-test="iban"
                />
                {errors.iban && <p className={styles.formError}>{errors.iban.message}</p>}
            </div>
            <div className={styles.formInputField}>
                <label htmlFor="amount" className={styles.formLabel}>
                    Amount
                </label>
                <input
                    {...register('amount')}
                    id="amount"
                    placeholder="0.00"
                    className={styles.formInput}
                    data-test="amount"
                />
            </div>
            <button type="submit" disabled={mutation.isPaying} className={styles.formButton}>
                Make payment
            </button>
        </form>
    );
};
