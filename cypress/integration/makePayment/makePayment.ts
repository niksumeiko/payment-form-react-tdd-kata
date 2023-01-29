import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I open a payment page', () => {
    cy.visit('/');
});

When('I fill in details for a domestic payment', () => {
    cy.get('form').findByLabelText('payment.receiver.iban').type('SK123');
    cy.get('form').findByLabelText('payment.amount').type('10');
});

When('I submit a payment', () => {
    cy.get('form').findByRole('button', { name: 'payment.submit' }).click();
});

Then('I see successful payment confirmation', () => {
    cy.get('form').should('not.exist');
    cy.contains('payment.success.title').should('be.visible');
});
