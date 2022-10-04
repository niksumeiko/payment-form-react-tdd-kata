/* eslint-disable george/jsx-no-inline-styles */
import type { FC } from 'react';
import React from 'react';

import { PaymentForm } from './PaymentForm';

export const PaymentFormPage: FC = () => {
    return (
        <div>
            <header
                style={{
                    width: '100%',
                    height: '70px',
                    textAlign: 'center',
                    background: '#bce4fa',
                }}
            >
                <h1
                    style={{
                        color: '#21416c',
                        margin: 0,
                        padding: 0,
                        lineHeight: '70px',
                    }}
                >
                    Domestic payment
                </h1>
            </header>
            <div
                style={{
                    background: 'white',
                    padding: '3rem 3rem 1rem',
                    margin: '0 auto',
                    maxWidth: '500px',
                    boxShadow: '0 0.125rem 0.5rem rgb(33 65 108 / 8%)',
                }}
            >
                <PaymentForm />
            </div>
            <footer>Created with ♡ for OpenSlava</footer>
        </div>
    );
};
