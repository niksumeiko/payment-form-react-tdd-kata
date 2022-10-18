import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I fill in details for a domestic payment', () => {
    cy.get('[data-test="iban"]').type('SK123');
    cy.get('[data-test="amount"]').type('10');
});

When('I fill in details for an international payment', () => {
    cy.get('[data-test="iban"]').type('AT352011142012679110');
    cy.get('[data-test="bic"]').type('GIBAATWWXXX');
    cy.get('[data-test="amount"]').type('10');
});

When('I open a payment page', () => {
    cy.visit('/');
});

When('I submit a payment', () => {
    cy.get('form [type="submit"]').click();
});

Then('I see successful payment confirmation', () => {
    cy.get('[data-test="payment-success"]').should('be.visible');
});
