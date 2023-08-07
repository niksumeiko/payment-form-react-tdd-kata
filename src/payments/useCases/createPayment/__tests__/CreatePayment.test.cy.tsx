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

describe('invalid payment input data validations', () => {
    it('unable to create payment when missing iban', () => {
        cy.intercept('POST', '**/pay', cy.spy().as('createPayment'));

        cy.mount(<PaymentFormPage />);

        cy.get('form [data-test="amount-entry"]').type('10');
        cy.get('form [data-test="submit-cta"]').click();

        cy.contains('[role="alert"]', 'Missing IBAN').should('be.visible');
        cy.get('@createPayment').should('not.have.been.called');
    });
});

describe('payment receiver bank details', () => {
    it('see receiver bank details', () => {
        cy.intercept('GET', '**/receiver**', {
            body: {
                isInternal: true,
                bank: { name: 'Super bank' },
            },
        });

        cy.mount(<PaymentFormPage />);

        cy.get('form [data-test="iban-entry"]').type('SK123').blur();

        cy.contains('[role="alert"]', 'Super bank').should('be.visible');
    });
});
