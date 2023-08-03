import { PaymentFormPage } from '../PaymentFormPage';

describe('create payment', () => {
    it('create payment request', () => {
        cy.intercept('POST', '**/pay').as('createPayment');

        cy.mount(<PaymentFormPage />);

        cy.get('form [data-test="iban-entry"]').type('SK123');
        cy.get('form [data-test="amount-entry"]').type('10');
        cy.get('form [data-test="submit-cta"]').click();

        cy.wait('@createPayment').its('request.body').should('deep.equal', {
            iban: 'SK123',
            amount: 10,
        });
    });
});
