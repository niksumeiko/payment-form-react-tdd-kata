import React from 'react';
import { act, configure, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { MultiContextProvider } from '../../utils/context';
import { creatApiAdapters } from '../../api/ApiAdapters';
import { PaymentFormPage } from '../PaymentFormPage';

configure({ testIdAttribute: 'data-test' });

const queryClient = new QueryClient();

describe('DomesticPayment', () => {
    it('sends API request when creating domestic payment', async () => {
        const response = { id: 'x', iban: 'SK123', amount: 2 };
        const request = jest.fn().mockResolvedValue(response);

        const { getByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MultiContextProvider
                    providers={[
                        creatApiAdapters({
                            createPayment: request,
                        }),
                    ]}
                >
                    <PaymentFormPage />
                </MultiContextProvider>
            </QueryClientProvider>,
        );

        await act(() => {
            userEvent.type(getByTestId('iban'), 'SK123');
            userEvent.type(getByTestId('amount'), '2');

            userEvent.click(getByText('Make payment'));
        });

        await waitFor(() =>
            expect(request).toHaveBeenCalledWith({
                iban: 'SK123',
                amount: '2',
            }),
        );
    });
});
