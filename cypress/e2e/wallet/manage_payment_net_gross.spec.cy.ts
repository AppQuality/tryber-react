import getCurrencySymbol from "../../../src/utils/getCurrencySymbol";

describe("If api response have net value", () => {
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
        fixture: "/users/me/_get/200_booty_net",
      }
    ).as("pendingBooty");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me/payments?order=DESC&orderBy=paidDate&limit=10&start=0`,
      {
        statusCode: 200,
        fixture: "users/me/payments/_get/200_multiple-pages-all-paid.json",
      }
    ).as("tablePayments");
    cy.visit("/payments");
  });
  it("payment request card should display both net and gross values", () => {
    return cy.fixture("/users/me/_get/200_booty_net").then((user) => {
      cy.dataQa("wallet-management").within(() => {
        cy.dataQa("net-booty").should(
          "contain",
          `${user.pending_booty.net.value.toFixed(2)}${getCurrencySymbol(
            user.pending_booty.net.currency
          )}`
        );
        cy.dataQa("gross-booty").should(
          "contain",
          `${user.pending_booty.gross.value.toFixed(2)}${getCurrencySymbol(
            user.pending_booty.gross.currency
          )}`
        );
      });
    });
  });
  it("payment request button should open a modal with both net and gross values", () => {
    return cy.fixture("/users/me/_get/200_booty_net").then((user) => {
      cy.dataQa("wallet-management").within(() => {
        cy.dataQa("request-payment-cta").click();
      });
      cy.get(".modal").within(() => {
        cy.get("#paymentMethod-pp").click();
        cy.get("#termsAcceptance").click();
        cy.dataQa("payment-modal-next").click();
        cy.get("#ppAccountOwner").type("e@mail.com");
        cy.get("#confirmEmail").type("e@mail.com");
        cy.dataQa("payment-modal-next").click();
        cy.dataQa("payment-modal-net-booty").should(
          "have.text",
          `${getCurrencySymbol(
            user.pending_booty.net.currency
          )}${user.pending_booty.net.value.toFixed(2)}`
        );
        cy.dataQa("payment-modal-gross-booty").should(
          "contain",
          `${getCurrencySymbol(
            user.pending_booty.gross.currency
          )}${user.pending_booty.gross.value.toFixed(2)}`
        );
      });
    });
  });
});

describe("If api response does not have net value", () => {
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
        fixture: "/users/me/_get/200_booty_gross",
      }
    ).as("pendingBooty");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me/payments?order=DESC&orderBy=paidDate&limit=10&start=0`,
      {
        statusCode: 200,
        fixture: "users/me/payments/_get/200_multiple-pages-all-paid.json",
      }
    ).as("tablePayments");
    cy.visit("/payments");
  });
  it("payment request card should display only gross values", () => {
    return cy.fixture("/users/me/_get/200_booty_gross").then((user) => {
      cy.dataQa("wallet-management").within(() => {
        cy.dataQa("net-booty").should("not.exist");
        cy.dataQa("gross-booty").should(
          "contain",
          `${user.pending_booty.gross.value.toFixed(2)}${getCurrencySymbol(
            user.pending_booty.gross.currency
          )}`
        );
      });
    });
  });
  it("payment request modal should open a modal showing only gross value", () => {
    return cy.fixture("/users/me/_get/200_booty_gross").then((user) => {
      cy.dataQa("wallet-management").within(() => {
        cy.dataQa("request-payment-cta").click();
      });
      cy.get(".modal").within(() => {
        cy.get("#paymentMethod-pp").click();
        cy.get("#termsAcceptance").click();
        cy.dataQa("payment-modal-next").click();
        cy.get("#ppAccountOwner").type("e@mail.com");
        cy.get("#confirmEmail").type("e@mail.com");
        cy.dataQa("payment-modal-next").click();
        cy.dataQa("payment-modal-net-booty").should("not.exist");
        cy.dataQa("payment-modal-gross-booty").should(
          "contain",
          `${getCurrencySymbol(
            user.pending_booty.gross.currency
          )}${user.pending_booty.gross.value.toFixed(2)}`
        );
      });
    });
  });
});
describe("Booty details table", () => {
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
        fixture: "/users/me/_get/200_booty_net",
      }
    ).as("pendingBooty");

    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me/pending_booty?order=DESC&orderBy=attributionDate&limit=10&start=0`,
      {
        statusCode: 200,
        fixture: "users/me/pending_booty/_get/200_multiple-attributions",
      }
    ).as("bootyDetails");
    cy.visit("/payments");
  });
  it("should only show tot gross and not net amount", () => {
    cy.dataQa("wallet-management").within(() => {
      cy.dataQa("booty-details-cta").click();
    });
    cy.get(".modal").within(() => {
      cy.get(".thead").should("contain", "Tot. gross");
      cy.get(".thead").should("not.contain", "Net");
    });
  });
});
