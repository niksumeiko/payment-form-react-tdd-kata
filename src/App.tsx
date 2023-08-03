import type { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PaymentFormPage } from './payments/useCases/createPayment/PaymentFormPage';

const queryClient = new QueryClient();

export const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-screen flex items-center justify-center">
                <PaymentFormPage />
            </div>
        </QueryClientProvider>
    );
};
