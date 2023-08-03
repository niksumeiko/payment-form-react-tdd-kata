import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { useCreatePayment } from './useCreatePayment';
import type { PaymentFormValues } from './CreatePaymentService';

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
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                    <h2
                        data-test="payment-success-message"
                        className="mt-5 text-2xl font-semibold leading-9 tracking-tight text-green-600"
                    >
                        A payment succeed!
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 bg-white px-10 py-6 border rounded-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                    <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Payment form
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        Make payments effortless
                    </p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit(createPayment)}
                            autoComplete="off"
                        >
                            <div>
                                <label
                                    htmlFor="iban"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Recipient (IBAN)
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register('iban')}
                                        data-test="iban-entry"
                                        id="iban"
                                        name="iban"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.iban && (
                                    <p
                                        role="alert"
                                        className="mt-2 text-sm text-red-600 dark:text-red-500"
                                    >
                                        {errors.iban.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="amount"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Amount
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        {...register('amount')}
                                        data-test="amount-entry"
                                        id="amount"
                                        name="amount"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="pb-4">
                                <button
                                    data-test="submit-cta"
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Make payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
