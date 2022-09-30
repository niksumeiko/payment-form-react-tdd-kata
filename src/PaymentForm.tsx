/* eslint-disable george/jsx-no-inline-styles */
import React from 'react';
import type { FC } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

export const PaymentForm: FC = () => {
    return (
        <Form layout="vertical" autoComplete="off">
            <Form.Item label="Account number (IBAN)">
                <Input size="large" />
            </Form.Item>
            <Form.Item label="Amount">
                <InputNumber
                    style={{ width: '100%' }}
                    prefix="€"
                    addonAfter="EUR"
                    controls={false}
                    min={0}
                    decimalSeparator="."
                    precision={2}
                    size="large"
                />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" size="large">
                    Pay
                </Button>
            </Form.Item>
        </Form>
    );
};
