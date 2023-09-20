/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export {};

interface dataQaOptions {
  startsWith?: boolean;
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-qa attribute.
       * @example cy.dataQa('greeting')
       */
      dataQa(
        value: string,
        options?: dataQaOptions
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("dataQa", (value, options) => {
  return options?.startsWith
    ? cy.get(`[data-qa^=${value}]`)
    : cy.get(`[data-qa=${value}]`);
});
