describe("tab fiscal profile", () => {
  beforeEach(() => {
    cy.loggedIn();

    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/users/me?fields=all`,
      {
        statusCode: 200,
        fixture: "users/me/_get/200_Example_1",
      }
    ).as("userAllfields");

    cy.intercept(
      "GET",
      `${Cypress.env("REACT_APP_API_URL")}/custom_user_fields`,
      {
        statusCode: 200,
        fixture: "custom_user_fields/_get/200_Example-1",
      }
    ).as("customUserFields");
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/education`, {
      statusCode: 200,
      fixture: "education/_get/200_Example-1",
    }).as("education");
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/employments`, {
      statusCode: 200,
      fixture: "employments/_get/200_Example-1",
    }).as("employments");
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/languages`, {
      statusCode: 200,
      fixture: "languages/_get/200_All-languages",
    }).as("languages");

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
