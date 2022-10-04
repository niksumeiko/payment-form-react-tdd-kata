import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PaymentFormPage } from './payment/PaymentFormPage';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <PaymentFormPage />
        </QueryClientProvider>
    );
}

export default App;
