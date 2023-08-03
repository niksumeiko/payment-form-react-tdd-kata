import type { FC } from 'react';

import './App.css';
import { PaymentFormPage } from './payments/useCases/savePayment/PaymentFormPage';

export const App: FC = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <PaymentFormPage />
        </div>
    );
};
