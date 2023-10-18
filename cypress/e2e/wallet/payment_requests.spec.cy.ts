//For Users with profile type witholding > 5K, VAT, Company and internal
describe("Payment request", () => {
  const fiscalTypes = [
    { key: "vat", name: "Partita IVA Forfettaria" },
    // "witholding-extra",
    // "company"
  ];
  fiscalTypes.forEach((fiscalType) => {
    describe(` for fiscal type ${fiscalType.name}`, () => {
      beforeEach(() => {
        cy.loggedIn();
        cy.intercept(
          "GET",
          `${Cypress.env("REACT_APP_API_URL")}/users/me/fiscal`,
          {
            statusCode: 200,
            fixture: `users/me/fiscal/_get/200_${fiscalType.key}`,
          }
        ).as("userMeFiscal");
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
        cy.visit("/payments");
      });
      it(`The button to request payments is enabled`, () => {
        cy.dataQa("request-payment-cta").should("be.enabled");
      });
      it("clicking on the button a manual payment request is opened", () => {
        cy.dataQa("request-payment-cta").click();
        cy.dataQa("manual-payment-modal").should("be.visible");
      });
      it("in the modal is visible an explanatory text, name field, iban field, terms acceptance checkbox and a contiunue btn", () => {
        cy.dataQa("request-payment-cta").click();
        cy.dataQa("manual-payment-modal-introduction-text").should(
          "be.visible"
        );
        cy.dataQa("input#bankaccountOwner").should("be.visible");
        cy.get("input#iban").should("be.visible");
        cy.get("input[name='termsAcceptance']").should("be.visible");
        cy.dataQa("payment-modal-next").should("be.visible");
      });

      it('click on the link "Terms and conditions" open a link in a new tab', () => {
        cy.dataQa("request-payment-cta").click();
        cy.dataQa("manual-payment-modal-terms-and-conditions-link").should(
          "be.visible"
        );
        cy.dataQa("manual-payment-modal-terms-and-conditions-link")
          .should("have.attr", "target")
          .and("include", "_blank");
      });
      it("clicking on next button, if the name field is empty, should print an error under the field", () => {
        cy.dataQa("request-payment-cta").click();
        cy.dataQa("payment-modal-next").click();
        cy.get("input#iban").clear().type("IT60X0542811101000000123456");
        cy.get("#termsAcceptance").check();
        cy.dataQa("payment-modal-next").click();
        cy.dataQa("manual-payment-modal-account-holder").should(
          "contain",
          "This is a required field"
        );
      });
      it("clicking on next button, if the iban field is not a valid iban, should print an error under the field", () => {
        cy.dataQa("request-payment-cta").click();
        cy.dataQa("payment-modal-next").click();

        cy.get("input#bankaccountOwner").clear().type("ciccio paguro");
        cy.get("input#iban").clear().type("wrong iban");
        cy.get("#termsAcceptance").check();
        cy.dataQa("payment-modal-next").click();
        cy.dataQa("manual-payment-modal-iban").should(
          "contain",
          "This format is invalid"
        );
      });
      it("clicking on next button, if the iban field is empty, should print an error under the field", () => {
        cy.dataQa("request-payment-cta").click();
        cy.dataQa("payment-modal-next").click();

        cy.get("input#bankaccountOwner").clear().type("ciccio paguro");
        cy.get("#termsAcceptance").check();
        cy.dataQa("payment-modal-next").click();
        cy.dataQa("manual-payment-modal-iban").should(
          "contain",
          "This is a required field"
        );
      });
      it("clicking on next button, if the terms and condition checkbox is not checked, should print an error under the field", () => {
        cy.dataQa("request-payment-cta").click();
        cy.dataQa("payment-modal-next").click();

        cy.get("input#bankaccountOwner").clear().type("ciccio paguro");
        cy.get("input#iban").clear().type("IT60X0542811101000000123456");

        cy.dataQa("payment-modal-next").click();
        cy.dataQa("manual-payment-modal-terms").should(
          "contain",
          "You need to accept terms and conditions"
        );
      });
      it("clicking on next button, if the name is filled, the iban is filled with a valid iban and the checkbox is checked, should go to the second step", () => {});

      it("in the second step is visible the amount gross, an explanatory text, a button to go back and a button to start the payment process", () => {});
      it("in the second step if the back button is pressed, should go to the first step", () => {});
      it("in the second step if the process payment is pressed, should call the POST /users/me/payment with the iban and the account name in the body", () => {});
      it("in the second step if the process payment is pressed, while the api call is being executed, the process payment button (????and back???) is disabled and there is a loading text", () => {});

      it("in the second step if the process payment is pressed, if the api call is successful, should show the third step", () => {});
      it("in the second step if the process payment is pressed, if the api call is not successful, show a toastr and reenable the button", () => {});
      it("in the third step is visible an explanatory text", () => {});
      it("if the payment is successful, the table should be refetched (??? too low level ???)", () => {});
    });
  });
});
