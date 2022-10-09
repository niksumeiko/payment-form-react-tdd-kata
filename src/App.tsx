import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MultiContextProvider } from './utils/context';
import { creatApiAdapters } from './api/ApiAdapters';
import { createPayment } from './payment/api/PaymentApiService';
import { PaymentFormPage } from './payment/PaymentFormPage';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MultiContextProvider providers={[creatApiAdapters({ createPayment })]}>
                <PaymentFormPage />
            </MultiContextProvider>
        </QueryClientProvider>
    );
}

export default App;
