import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import type { TableDefinition } from 'cypress-cucumber-preprocessor';

type Method = 'GET' | 'POST';

Given(
    'API {string} {string} endpoint is mocked with',
    (method: Method, endpoint: string, table: TableDefinition) => {
        const body = table.rowsHash();
        const alias = method + endpoint;

        cy.intercept(method, endpoint, {
            body,
            hostname: 'localhost',
            port: 9000,
        }).as(alias);
    },
);

Then(
    'API {string} {string} endpoint hits with',
    (method: Method, endpoint: string, table: TableDefinition) => {
        const body = table.rowsHash();
        const alias = method + endpoint;

        cy.wait(`@${alias}`).its('request.body').should('be.like', body);
    },
);

Given('I open a {string} page', (pathname: string) => {
    cy.visit(`http://localhost:3000${pathname}`);
});

When('I fill in payment details', (table: TableDefinition) => {
    const values = table.hashes();

    values.forEach(({ selector, value, inputType }) => {
        const query = `[data-test="${selector}"]`;

        if (inputType === 'checkbox') {
            const handler = value === 'true' ? 'check' : 'uncheck';

            cy.get(query)[handler]({ force: true });
            return;
        }

        cy.get(query).type(value);
    });
});

When('I submit a payment', () => {
    cy.get('form [type="submit"]').click();
});

Then('I see created payment confirmation', () => {
    cy.get('[data-test="payment-success"]').should('have.text', 'Payment done');
});
