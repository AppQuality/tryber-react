describe("Net and gross columns in wallet table", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me?fields=name%2Csurname%2Cimage%2Conboarding_completed%2Cemail%2Cwp_user_id`,
      {
        statusCode: 200,
        fixture: "users/me/_get/200_Example_1.json",
      }
    );

    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me/fiscal`, {
      statusCode: 200,
      fixture: "users/me/fiscal/_get/200_non_italian",
    });

    cy.visit("/payments");
  });

  it("Should show columns net and gross in wallet table", () => {
    cy.get(".wallet-table").within(() => {
      cy.get(".thead").should("have.length", 7);
      cy.get(".thead").contains("net", { matchCase: false });
      cy.get(".thead").contains("gross", { matchCase: false });
    });
  });

  it.only("Should show net and gross values in wallet table", () => {
    cy.get(".wallet-table").within(() => {
      cy.get(".tbody").should("exist");
      cy.get(".tbody:nth-child(n+2)").should("not.be.empty");
      cy.get(".tbody:nth-child(n+3)").should("not.be.empty");
    });
  });
});
