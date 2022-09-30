/* eslint-disable george/jsx-no-inline-styles */
import React from 'react';
import { Col, Layout, Row, Typography } from 'antd';

import './App.css';

import { PaymentForm } from './PaymentForm';

function App() {
    return (
        <Layout>
            <Layout.Header>header</Layout.Header>
            <Layout>
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
}

export default App;
