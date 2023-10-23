describe("tab fiscal profile", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me?fields=name%2Csurname%2Cimage%2Conboarding_completed%2Cemail%2Cwp_user_id`,
      {
        statusCode: 200,
        fixture: "users/me/_get/200_Example_1",
      }
    ).as("refreshUser");

    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me?fields=all`,
      {
        statusCode: 200,
        fixture: "users/me/_get/200_Example_1",
      }
    ).as("userAllfields");

    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me/fiscal`, {
      statusCode: 200,
      fixture: "users/me/fiscal/_get/200_internal",
    }).as("usersMeFiscal");

    cy.visit("/my-account/?tab=fiscal");
  });
  it("If Api layer answer with an internal fiscal profile, edit Button is disabled", () => {
    cy.dataQa("edit-fiscal-data-cta").should("be.disabled");
  });
});
