import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const NEW_PAYMENT_ENDPOINT = '/pay';
const NEW_PAYMENT_METHOD = 'POST';
const DOMESTIC_PAYMENT_DETAILS = {
    iban: 'SK123',
    amount: '10',
};

Given('The app is ready for a domestic payment', () => {
    const alias = NEW_PAYMENT_METHOD + NEW_PAYMENT_ENDPOINT;

    cy.intercept(NEW_PAYMENT_METHOD, NEW_PAYMENT_ENDPOINT, {
        body: {
            ...DOMESTIC_PAYMENT_DETAILS,
            id: 'x',
        },
        hostname: 'localhost',
        port: 9000,
    }).as(alias);
});

Then('The domestic payment is made', () => {
    const alias = NEW_PAYMENT_METHOD + NEW_PAYMENT_ENDPOINT;

    cy.wait(`@${alias}`).its('request.body').should('to.deep.equal', DOMESTIC_PAYMENT_DETAILS);
});

When('I fill in details for a domestic payment', () => {
    cy.get('[data-test="iban"]').type('SK123');
    cy.get('[data-test="amount"]').type('10');
});

When('I open a payment page', () => {
    cy.visit('http://localhost:3000');
});

When('I submit a payment', () => {
    cy.get('form [type="submit"]').click();
});

Then('I see created payment confirmation', () => {
    cy.get('[data-test="payment-success"]').should('be.visible');
});
