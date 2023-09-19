describe("Net and gross columns in wallet table", () => {
  beforeEach(() => {
    cy.visit("/payments");
  });

  it("Should show columns net and gross in wallet table", () => {
    cy.get(".wallet-table").within(() => {
      cy.get(".thead").should("have.length", 7);
      cy.get(".thead").contains("net", { matchCase: false });
      cy.get(".thead").contains("gross", { matchCase: false });
    });
  });

  it('Should show a dash ("-") in the net column and the gross in the gross column if the user has requested a payment without a net', () => {
    cy.get(".wallet-table").within(() => {
      cy.get(".tbody:nth-child(n + 3)").contains("-");
    });
  });
});
