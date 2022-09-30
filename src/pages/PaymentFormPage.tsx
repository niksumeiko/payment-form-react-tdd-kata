/* eslint-disable george/jsx-no-inline-styles */
import type { FC } from 'react';
import React from 'react';
import { Col, Layout, Row, Typography } from 'antd';

import { PaymentForm } from 'src/payment-form/PaymentForm';

export const PaymentFormPage: FC = () => {
    return (
        <Layout>
            <Layout.Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                    height: '70px',
                    textAlign: 'center',
                    background: '#bce4fa',
                }}
            >
                <Typography.Title
                    level={2}
                    style={{
                        color: '#21416c',
                        margin: 0,
                        padding: 0,
                        lineHeight: '70px',
                    }}
                >
                    Domestic payment
                </Typography.Title>
            </Layout.Header>
            <Layout style={{ paddingTop: '5rem' }}>
                <Layout.Content>
                    <Row justify="center" style={{ marginTop: '3rem' }}>
                        <Col
                            xs={22}
                            style={{
                                background: 'white',
                                padding: '3rem 3rem 1rem',
                                maxWidth: '500px',
                                boxShadow: '0 0.125rem 0.5rem rgb(33 65 108 / 8%)',
                            }}
                        >
                            <PaymentForm />
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
            <Layout.Footer style={{ textAlign: 'center', opacity: 0.75 }}>
                <Typography.Text>Created with ♡ for OpenSlava</Typography.Text>
            </Layout.Footer>
        </Layout>
    );
};
