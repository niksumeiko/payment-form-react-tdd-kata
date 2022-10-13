import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { createApiAdapters } from 'src/api/ApiAdapters';
import { MultiContextProvider } from 'src/common/context/index';

import type { Payment } from '../PaymentService';
import { PaymentFormPage } from '../PaymentFormPage';

const queryClient = new QueryClient();

describe('AnyPayment', () => {
    it('renders validation error when IBAN is missing', async () => {
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MultiContextProvider providers={[createApiAdapters({ createPayment: jest.fn() })]}>
                    <PaymentFormPage />
                </MultiContextProvider>
            </QueryClientProvider>,
        );

        await act(() => {
            userEvent.click(getByText('Make payment'));
        });

        await waitFor(() => expect(getByText('Missing IBAN')).toBeInTheDocument());
    });

    it('renders validation error when amount is missing', async () => {
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MultiContextProvider providers={[createApiAdapters({ createPayment: jest.fn() })]}>
                    <PaymentFormPage />
                </MultiContextProvider>
            </QueryClientProvider>,
        );

        await act(() => {
            userEvent.click(getByText('Make payment'));
        });

        await waitFor(() => expect(getByText('Missing payment amount')).toBeInTheDocument());
    });

    it('renders details after payment was created', async () => {
        const response: Payment = { id: 'x', iban: 'SK123', amount: '2', type: 'DOM' };
        const request = jest.fn().mockResolvedValue(response);
        const { getByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MultiContextProvider providers={[createApiAdapters({ createPayment: request })]}>
                    <PaymentFormPage />
                </MultiContextProvider>
            </QueryClientProvider>,
        );

        await act(() => {
            userEvent.type(getByTestId('iban'), 'SK123');
            userEvent.type(getByTestId('amount'), '2');

            userEvent.click(getByText('Make payment'));
        });

        await waitFor(() => {
            expect(getByText('A domestic payment succeed!')).toBeInTheDocument();
        });
    });
});
