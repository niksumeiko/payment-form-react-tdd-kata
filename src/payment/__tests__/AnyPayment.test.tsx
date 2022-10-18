import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { PaymentFormPage } from '../PaymentFormPage';
import * as PaymentApiService from '../api/PaymentApiService';

const queryClient = new QueryClient();

describe('AnyPayment', () => {
    it('renders validation error when IBAN is missing', async () => {
        jest.spyOn(PaymentApiService, 'createPaymentRequest').mockReturnValue(jest.fn());
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <PaymentFormPage />
            </QueryClientProvider>,
        );

        await act(() => {
            userEvent.click(getByText('Make payment'));
        });

        await waitFor(() => expect(getByText('Missing IBAN')).toBeInTheDocument());
    });

    it('renders validation error when amount is missing', async () => {
        jest.spyOn(PaymentApiService, 'createPaymentRequest').mockReturnValue(jest.fn());
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <PaymentFormPage />
            </QueryClientProvider>,
        );

        await act(() => {
            userEvent.click(getByText('Make payment'));
        });

        await waitFor(() => expect(getByText('Missing payment amount')).toBeInTheDocument());
    });
});
