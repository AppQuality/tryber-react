describe("Net and gross columns in wallet table", () => {
  const numberOfColumns = 7;

  beforeEach(() => {
    cy.loggedIn();

    cy.intercept("GET", `**/users/me/fiscal`, {
      statusCode: 200,
      fixture: "users/me/fiscal/_get/200_non-italian",
    }).as("userMeFiscal");

    cy.intercept(
      {
        method: "GET",
        pathname: `**/users/me`,
        query: {
          fields: "pending_booty,booty_threshold",
        },
      },
      {
        statusCode: 200,
        fixture: "/users/me/_get/200_booty_net",
      }
    ).as("pendingBooty");

    cy.intercept(
      {
        method: "GET",
        pathname: `**/users/me/payments`,
        query: {
          order: "DESC",
          orderBy: "paidDate",
          limit: "10",
          start: "0",
        },
      },
      {
        statusCode: 200,
        fixture: "users/me/payments/_get/200_multiple-pages",
      }
    ).as("tablePayments");

    cy.intercept(
      {
        method: "GET",
        pathname: `**/users/me/payments`,
        query: {
          order: "DESC",
          orderBy: "paidDate",
          limit: "1",
          start: "0",
        },
      },
      {
        statusCode: 200,
        fixture: "users/me/payments/_get/200_single-paid-payment",
      }
    ).as("singlePaidPayment");

    cy.intercept(
      {
        method: "GET",
        pathname: `**/users/me/payments/1`,
        query: {
          order: "DESC",
          orderBy: "date",
          limit: "10",
          start: "0",
        },
      },
      {
        statusCode: 200,
        fixture: "users/me/payments/payment/_get/200_simple",
      }
    ).as("singlePaidPayment");

    cy.visit("/payments");
  });

  it("Should show columns net and gross in wallet table", () => {
    cy.get(".wallet-table").within(() => {
      cy.get(".thead").should("have.length", numberOfColumns);
      cy.get(".thead").contains("net", { matchCase: false });
      cy.get(".thead").contains("gross", { matchCase: false });
    });
  });

  it("Should show net and gross values in wallet table", () => {
    cy.get(".wallet-table").within(() => {
      cy.get(".tbody").should("exist");
      return cy
        .fixture("users/me/payments/_get/200_multiple-pages")
        .then((response) => {
          cy.get(".tbody.cell").should(
            "have.length",
            response.results.length * numberOfColumns
          );
          cy.get(".tbody.cell").each((cell, index) => {
            if (index % numberOfColumns === 2) {
              cy.wrap(cell).should("exist");
              cy.wrap(cell).should("not.be.empty");
              cy.wrap(cell).should(
                "contain",
                response.results[index % numberOfColumns].amount.gross.value
              );
            }
            if (index % numberOfColumns === 3) {
              cy.wrap(cell).should("exist");
              cy.wrap(cell).should("not.be.empty");
              cy.wrap(cell).should(
                "contain",
                response.results[index % numberOfColumns].amount.net.value
              );
            }
          });
        });
    });
  });

  it("Should show a non empty table in the payment detail modal", () => {
    cy.wait(1000);
    cy.get(".wallet-table").within(() => {
      cy.get(".tbody.cell").each((cell, index) => {
        if (index + 1 === numberOfColumns * 2) {
          // Second row last cell (with fixture)
          cy.wrap(cell).within(() => {
            cy.get(".action-details").as("btn").click();
            cy.wait(1000);
            cy.document().its("body").find(".modal").should("exist");
            cy.document()
              .its("body")
              .find(".modal")
              .within(() => {
                cy.get(".thead").should("exist");
                cy.get(".thead").should("have.length", 4);
                cy.get(".thead").should("contain", "gross");
                cy.get(".tbody").should("exist");
                cy.get(".tbody.cell").should("exist");
                cy.get(".tbody.cell").should("not.be.empty");
              });
          });
        }
      });
    });
  });

  it("Should show empty state if no payments", () => {
    cy.wait(1000);
    cy.get(".wallet-table").within(() => {
      cy.get(".tbody.cell").each((cell, index) => {
        if (index + 1 === numberOfColumns) {
          // First row (no fixture)
          cy.wrap(cell).within(() => {
            cy.get(".action-details").as("btn").click();
            cy.wait(1000);
            cy.document().its("body").find(".modal").should("exist");
            cy.document()
              .its("body")
              .find(".modal")
              .within((modal) => {
                cy.get(".thead").should("exist");
                cy.get(".tbody").should("not.exist");
                cy.wrap(modal).should("contain", "no data");
              });
          });
        }
      });
    });
  });
});
