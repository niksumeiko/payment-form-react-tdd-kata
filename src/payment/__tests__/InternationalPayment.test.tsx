import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { PaymentFormPage } from '../PaymentFormPage';
import * as PaymentApiService from '../api/PaymentApiService';

const queryClient = new QueryClient();

describe('InternationalPayment', () => {
    it('sends API request when creating international payment', async () => {
        const response = { id: 'x' };
        const request = jest.fn().mockResolvedValue(response);
        jest.spyOn(PaymentApiService, 'createPaymentRequest').mockReturnValue(request);
        const { getByTestId, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <PaymentFormPage />
            </QueryClientProvider>,
        );

        await act(() => {
            userEvent.type(getByTestId('iban'), 'AT352011142012679110');
            userEvent.type(getByTestId('bic'), 'GIBAATWWXXX');
            userEvent.type(getByTestId('amount'), '1');

            userEvent.click(getByText('Make payment'));
        });

        await waitFor(() =>
            expect(request).toHaveBeenCalledWith({
                iban: 'AT352011142012679110',
                bic: 'GIBAATWWXXX',
                amount: '1',
            }),
        );
    });

    it('renders validation error when BIC is missing', async () => {
        jest.spyOn(PaymentApiService, 'createPaymentRequest').mockReturnValue(jest.fn());
        const { getByText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <PaymentFormPage />
            </QueryClientProvider>,
        );

        await act(() => {
            userEvent.type(getByTestId('iban'), 'AT352011142012679110');
            userEvent.click(getByText('Make payment'));
        });

        await waitFor(() => expect(getByText('Missing BIC')).toBeInTheDocument());
    });
});
