/* eslint-disable george/jsx-no-inline-styles */
import type { FC } from 'react';
import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

interface FormValues {
    iban: string;
    amount: number;
}

export const PaymentForm: FC = () => {
    const handleSubmit = (values: FormValues) => {
        // eslint-disable-next-line no-console
        console.log(values);
    };

    return (
        <Form layout="vertical" autoComplete="off" requiredMark={false} onFinish={handleSubmit}>
            <Form.Item
                label="Recipient (IBAN)"
                name="iban"
                rules={[{ required: true, message: 'Missing IBAN' }]}
                data-test="iban"
            >
                <Input size="large" />
            </Form.Item>
            <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, message: 'Missing payment amount' }]}
                data-test="amount"
            >
                <InputNumber
                    style={{ width: '100%' }}
                    prefix="€"
                    addonAfter="EUR"
                    placeholder="0,00"
                    controls={false}
                    min={0}
                    decimalSeparator="."
                    precision={2}
                    size="large"
                />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" size="large" data-test="submit">
                    Pay
                </Button>
            </Form.Item>
        </Form>
    );
};
