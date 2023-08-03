import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I open a payment page', () => {
    cy.visit('/');
});

When('I fill in details for a domestic payment', () => {
    cy.get('form [data-test="iban-entry"]').type('SK123');
    cy.get('form [data-test="amount-entry"]').type('10');
});

When('I submit a payment', () => {
    cy.get('form [data-test="submit-cta"]').click();
});

Then('I see successful payment confirmation', () => {
    cy.get('form').should('not.exist');
    cy.get('[data-test="payment-success-message"]').should('be.visible');
});
