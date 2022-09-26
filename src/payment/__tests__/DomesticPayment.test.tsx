import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { PaymentFormPage } from '../PaymentFormPage';
import type { Payment } from '../PaymentService';
import * as PaymentApiService from '../api/PaymentApiService';

const queryClient = new QueryClient();

describe('DomesticPayment', () => {
    it('sends API request when creating domestic payment', async () => {
        const response: Payment = { id: 'x', iban: 'SK123', amount: '2', type: 'DOM' };
        const request = jest.fn().mockResolvedValue(response);
        jest.spyOn(PaymentApiService, 'createPaymentRequest').mockReturnValue(request);
        const { getByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <PaymentFormPage />
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
