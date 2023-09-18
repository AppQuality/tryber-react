describe("amount and amount_gross columns", () => {
  it("should show columns amount and amount_gross in wallet table", () => {
    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me?fields=pending_booty%2Cbooty_threshold`,
      {
        fixture: "/users/me/_get/200_booty_example",
        statusCode: 200,
      }
    ).as("getUserBooty");
    cy.visit("/payments");
  });
});
