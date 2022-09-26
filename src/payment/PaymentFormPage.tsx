import type { FC } from 'react';
import React from 'react';

import styles from '../App.module.scss';
import { PaymentForm } from './PaymentForm';

export const PaymentFormPage: FC = () => {
    return (
        <div>
            <header className={styles.header}>
                <div>
                    <div />
                    <div>
                        <h1 className={styles.headingTitle}>Payment form</h1>
                    </div>
                    <div />
                </div>
            </header>
            <div className={styles.contents}>
                <PaymentForm />
            </div>
            <footer className={styles.footer}>Created with ♡ for OpenSlava</footer>
        </div>
    );
};
