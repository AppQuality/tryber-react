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
      /**
       * Custom command to login user.
       * @example cy.loggedIn()
       */
      loggedIn();
    }
  }
}

Cypress.Commands.add("loggedIn", () => {
  cy.intercept(
    "GET",
    `${Cypress.env(
      "REACT_APP_API_URL"
    )}/users/me?fields=name%2Csurname%2Cimage%2Conboarding_completed%2Cemail%2Cwp_user_id`,
    {
      statusCode: 200,
      fixture: "users/me/_get/200_Example_1",
    }
  ).as("usersMeFields");
  cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me?`, {
    statusCode: 200,
    fixture: "users/me/_get/200_Example_1",
  }).as("usersMe");
});

Cypress.Commands.add("dataQa", (value, options) => {
  return options?.startsWith
    ? cy.get(`[data-qa^=${value}]`)
    : cy.get(`[data-qa=${value}]`);
});
