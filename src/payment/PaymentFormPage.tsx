import type { FC } from 'react';
import React from 'react';

import { useAccount } from 'src/account/useAccount';

import styles from '../App.module.scss';
import { PaymentForm } from './PaymentForm';

export const PaymentFormPage: FC = () => {
    const { account } = useAccount();

    return (
        <div>
            <header className={styles.header}>
                <div>
                    <div>
                        {account && (
                            <>
                                {account.name}
                                <br />€{account.balance}
                            </>
                        )}
                    </div>
                    <div>
                        <h1 className={styles.headingTitle} data-test="page-heading-title">
                            Domestic payment
                        </h1>
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
