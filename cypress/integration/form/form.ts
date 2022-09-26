import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open a form page', () => {
    cy.visit('http://localhost:3000');
});

Then('I see {string} in the title', (title: string) => {
    cy.title().should('include', title);
});
