import getCurrencySymbol from "../../../src/utils/getCurrencySymbol";

describe("The dahsboard statistics card", () => {
  beforeEach(() => {
    cy.loggedIn();
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me/rank`, {
      statusCode: 200,
      fixture: "users/me/rank/_get/200_stay-gold",
    }).as("userMeRank");
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me/popups`, {
      statusCode: 200,
      fixture: "popups/_get/404_not-found.json",
    }).as("popups");
    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me?fields=total_exp_pts%2Cbooty%2Cpending_booty%2Crank%2Cattended_cp%2Capproved_bugs`,
      {
        statusCode: 200,
        fixture: "users/me/_get/200_dashboard_fields_net.json",
      }
    ).as("popups");
    cy.visit("/my-dashboard");
  });
  it("should display both net and gross values if API response has net value", () => {
    cy.fixture("users/me/_get/200_dashboard_fields_net").then((response) => {
      cy.dataQa("received-booty").within(() => {
        cy.dataQa("net-booty").contains(
          `${getCurrencySymbol(response.booty.net.currency)}${
            response.booty.net.value
          }`
        );
        cy.dataQa("gross-booty").contains(
          `Gross ${getCurrencySymbol(response.booty.gross.currency)}${
            response.booty.gross.value
          }`
        );
      });
      cy.dataQa("pending-booty").within(() => {
        cy.dataQa("net-booty").contains(
          `${getCurrencySymbol(response.pending_booty.net.currency)}${
            response.pending_booty.net.value
          }`
        );
        cy.dataQa("gross-booty").contains(
          `Gross ${getCurrencySymbol(response.pending_booty.gross.currency)}${
            response.pending_booty.gross.value
          }`
        );
      });
    });
  });
});
describe("The dahsboard statistics card", () => {
  beforeEach(() => {
    cy.loggedIn();
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me/rank`, {
      statusCode: 200,
      fixture: "users/me/rank/_get/200_stay-gold",
    }).as("userMeRank");
    cy.intercept("GET", `${Cypress.env("REACT_APP_API_URL")}/users/me/popups`, {
      statusCode: 200,
      fixture: "popups/_get/404_not-found.json",
    }).as("popups");
    cy.intercept(
      "GET",
      `${Cypress.env(
        "REACT_APP_API_URL"
      )}/users/me?fields=total_exp_pts%2Cbooty%2Cpending_booty%2Crank%2Cattended_cp%2Capproved_bugs`,
      {
        statusCode: 200,
        fixture: "users/me/_get/200_dashboard_fields_gross_only.json",
      }
    ).as("popups");
    cy.visit("/my-dashboard");
  });
  it("should display only gross value if API response does not have net value", () => {
    cy.fixture("users/me/_get/200_dashboard_fields_gross_only").then(
      (response) => {
        cy.dataQa("received-booty").within(() => {
          cy.dataQa("gross-booty").contains(
            `${getCurrencySymbol(response.booty.gross.currency)}${
              response.booty.gross.value
            }`
          );
          cy.dataQa("net-booty").should("not.exist");
        });
        cy.dataQa("pending-booty").within(() => {
          cy.dataQa("gross-booty").contains(
            `${getCurrencySymbol(response.pending_booty.gross.currency)}${
              response.pending_booty.gross.value
            }`
          );
          cy.dataQa("net-booty").should("not.exist");
        });
      }
    );
  });
});
