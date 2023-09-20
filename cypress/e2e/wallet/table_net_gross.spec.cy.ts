describe("Net and gross columns in wallet table", () => {
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
    ).as("userMeFields");

    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me/fiscal`, {
      statusCode: 200,
      fixture: "users/me/fiscal/_get/200_non_italian",
    }).as("userMeFiscal");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me?fields=pending_booty%2Cbooty_threshold`,
      {
        statusCode: 200,
        fixture: "/users/me/pending_booty/_get/200_multiple-attributions",
      }
    ).as("pendingBooty");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me/payments?order=DESC&orderBy=paidDate&limit=10&start=0`,
      {
        statusCode: 200,
        fixture: "users/me/payments/_get/200_multiple-pages",
      }
    ).as("tablePayments");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me/payments?order=DESC&orderBy=paidDate&limit=1&start=0`,
      {
        statusCode: 200,
        fixture: "users/me/payments/_get/200_single-paid-payment",
      }
    ).as("singlePaidPayment");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me/payments/1?order=DESC&orderBy=date&limit=10&start=0`,
      {
        statusCode: 200,
        fixture: "users/me/payments/payment/_get/200_simple",
      }
    ).as("singlePaidPayment");

    cy.visit("/payments");
  });

  it("Should show columns net and gross in wallet table", () => {
    cy.get(".wallet-table").within(() => {
      cy.get(".thead").should("have.length", 7);
      cy.get(".thead").contains("net", { matchCase: false });
      cy.get(".thead").contains("gross", { matchCase: false });
    });
  });

  it("Should show net and gross values in wallet table", () => {
    cy.get(".wallet-table").within(() => {
      cy.get(".tbody").should("exist");
      cy.get(".tbody:nth-child(n+2)").should("not.be.empty");
      cy.get(".tbody:nth-child(n+3)").should("not.be.empty");
    });
  });

  // esempio di uso fixture per testare il contenuto di una card
  // viene da cypress/e2e/Ux-Dashboard/05-sentiment.cy.ts nella repo

  // it("Should print sentiments in a recap card", () => {
  //   cy.fixture("campaigns/id/ux/_get/response/200_draft_with_sentiments").then(
  //     (response) => {
  //       cy.dataQa("sentiment-chart-section").within(() => {
  //         cy.dataQa("sentiment-card-", { startsWith: true })
  //           .should("have.length", response.sentiments.length)
  //           .each((card, index) => {
  //             cy.wrap(card)
  //               .find(".aq-card-title")
  //               .should("contain", `${index + 1}. UC ${index + 1}`);
  //             // TODO: change this to the real sentiment but the value name is not in the fixture
  //             cy.wrap(card).find(".aq-card-body").should("contain", "Molto");
  //             cy.wrap(card)
  //               .find(".aq-card-body")
  //               .should("contain", response.sentiments[index].comment);
  //           });
  //       });
  //     }
  //   );
  // });
});
