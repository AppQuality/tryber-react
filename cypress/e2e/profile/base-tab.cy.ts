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

    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/languages`, {
      statusCode: 200,
      fixture: "languages/_get/200_All-languages",
    }).as("languages");

    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me/fiscal`, {
      statusCode: 200,
      fixture: "users/me/fiscal/_get/200_internal_fiscal_profile",
    }).as("usersMeFiscal");

    cy.visit("/my-account/?tab=base");
  });
  it("la modifica dei campi base non trigghera l'aggiornamento del fiscal profile", () => {
    const spy = cy.spy();
    cy.intercept("PATCH", `${Cypress.env("REACT_APP_API_URL")}/users/me`, {
      statusCode: 200,
      fixture: "users/me/_patch/200_Example-1",
    }).as("patchUsersMe");

    cy.intercept(
      "PUT",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/fiscal`,
      spy
    );

    cy.intercept(
      "PUT",
      `${Cypress.env("REACT_APP_API_URL")}/users/me/languages`,
      {
        statusCode: 200,
        fixture: "users/me/languages/_put/200_Example-1",
      }
    ).as("putUsersMeLanguages");

    cy.get("#name").clear();
    cy.get("#name").type("string edited");
    cy.dataQa("submit-base-info-cta").trigger("click");
    cy.wait(1000).then(() => expect(spy).not.to.have.been.called);
    cy.dataQa("invalid-fiscal-profile").should("not.exist");
  });
});
