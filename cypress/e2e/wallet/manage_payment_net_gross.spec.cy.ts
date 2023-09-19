describe("Net and gross columns in manage your payment card", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me?fields=pending_booty%2Cbooty_threshold`,
      {
        fixture: "/users/me/_get/200_pending_booty_example",
        statusCode: 200,
      }
    ).as("getUserBooty");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me/payments?order=DESC&orderBy=paidDate&limit=10&start=0`,
      {
        fixture: "/users/me/payments/_get/200_multiple-pages",
        statusCode: 200,
      }
    ).as("getUserPayments");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me/payments?order=DESC&orderBy=paidDate&limit=1&start=0`,
      {
        fixture: "/users/me/payments/_get/200_single-paid-payment",
        statusCode: 200,
      }
    ).as("getUserPaymentPaid");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me/payments/2?order=DESC&orderBy=date&limit=10&start=0`,
      {
        fixture: "/users/me/payments/_get/200_single-paid-payment",
        statusCode: 200,
      }
    ).as("getUserPaymentPendingSingle");

    cy.visit("/payments");
  });
});
