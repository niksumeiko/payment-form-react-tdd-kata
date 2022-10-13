import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createApiAdapters } from './api/ApiAdapters';
import { MultiContextProvider } from './common/context';
import { PaymentFormPage } from './payment/PaymentFormPage';
import { createPaymentRequest } from './payment/api/PaymentApiService';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MultiContextProvider
                providers={[
                    createApiAdapters({
                        createPayment: createPaymentRequest(window.fetch),
                    }),
                ]}
            >
                <PaymentFormPage />
            </MultiContextProvider>
        </QueryClientProvider>
    );
}

export default App;
