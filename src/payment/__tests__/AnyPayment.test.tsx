import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { createApiAdapters } from 'src/api/ApiAdapters';
import { MultiContextProvider } from 'src/common/context/index';

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
});
