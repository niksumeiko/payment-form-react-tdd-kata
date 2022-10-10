import React from 'react';
import { act, configure, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { MultiContextProvider } from '../../utils/context';
import { creatApiAdapters } from '../../api/ApiAdapters';
import { PaymentFormPage } from '../PaymentFormPage';

configure({ testIdAttribute: 'data-test' });

const queryClient = new QueryClient();

describe('AnyPayment', () => {
    it('renders validation error when IBAN is missing', async () => {
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MultiContextProvider
                    providers={[
                        creatApiAdapters({
                            createPayment: jest.fn(),
                        }),
                    ]}
                >
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
