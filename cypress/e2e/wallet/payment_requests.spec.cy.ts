//For Users with profile type witholding > 5K, VAT, Company and internal
describe("Payment request", () => {
  const fiscalTypes = [
    {
      key: "vat",
      name: "Partita IVA Forfettaria",
      translationKey: `VAT rate scheme`,
    },
    {
      key: "witholding-extra",
      name: ">5k",
      translationKey: `Annual witholding > 5000`,
    },
    {
      key: "company",
      name: "Partita IVA Ordinaria",
      translationKey: `Company rate scheme`,
    },
    {
      key: "internal",
      name: "Dipendente",
      translationKey: `Internal employee`,
    },
  ];
  beforeEach(() => {
    cy.loggedIn();
  });
  fiscalTypes.forEach((fiscalType) => {
    describe(` for fiscal type ${fiscalType.name}`, () => {
      beforeEach(() => {
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
        cy.intercept(
          "GET",
          `${Cypress.env("REACT_APP_API_URL")}/users/me?fields=pending_booty`,
          {
            statusCode: 200,
            fixture: "/users/me/_get/200_booty_gross",
          }
        ).as("pendingBooty");
        cy.visit("/payments");
      });

      describe("Payment request button", () => {
        it(`The button to request payments is enabled`, () => {
          cy.dataQa("request-payment-cta").should("be.enabled");
        });
        it("clicking on the button a manual payment request is opened", () => {
          cy.dataQa("request-payment-cta").click();
          cy.dataQa("manual-payment-modal").should("be.visible");
        });
      });

      describe("Payment request modal first step", () => {
        beforeEach(() => {
          cy.dataQa("request-payment-cta").click();
        });

        it("in first step is visible a recap of your fiscal profile and a next button", () => {
          cy.dataQa("manual-payment-fiscal-profile-recap").should("be.visible");
          cy.dataQa("payment-modal-next").should("be.visible");
        });

        it("in first step, clicking on the next button should show the second step", () => {
          cy.dataQa("payment-modal-next").should("be.visible");
          cy.dataQa("payment-modal-next").click();
          cy.dataQa("manual-payment-modal-step-1").should("be.visible");
        });

        it("should contain fiscal profile name", () => {
          cy.dataQa("manual-payment-fiscal-profile-recap").should(
            "contain",
            fiscalType.translationKey
          );
        });
      });

      describe("Payment request modal second step", () => {
        beforeEach(() => {
          cy.dataQa("request-payment-cta").click();
          cy.dataQa("payment-modal-next").should("be.visible");
          cy.dataQa("payment-modal-next").click();
        });

        it("is visible an explanatory text, name field, iban field, terms acceptance checkbox, a back and a continue btn", () => {
          cy.get("input#bankaccountOwner").should("be.visible");
          cy.get("input#iban").should("be.visible");
          cy.get("input[name='termsAcceptance']").should("be.visible");
          cy.dataQa("payment-modal-back").should("be.visible");
          cy.dataQa("payment-modal-next").should("be.visible");
        });

        it('click on the link "Terms and conditions" open a link in a new tab', () => {
          cy.dataQa("manual-payment-modal-terms-and-conditions-link").should(
            "be.visible"
          );
          cy.dataQa("manual-payment-modal-terms-and-conditions-link")
            .should("have.attr", "target")
            .and("include", "_blank");
        });

        it("clicking on next button, if the name field is empty, should print an error under the field", () => {
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
          cy.dataQa("payment-modal-next").click();

          cy.get("input#bankaccountOwner").clear().type("ciccio paguro");
          cy.get("input#iban").clear().type("wrong iban");
          cy.get("#termsAcceptance").check();
          cy.dataQa("payment-modal-next").click();
          cy.dataQa("manual-payment-modal-iban").should(
            "contain",
            "This is an invalid format."
          );
        });

        it("clicking on next button, if the iban field is empty, should print an error under the field", () => {
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
          cy.get("input#bankaccountOwner").clear().type("ciccio paguro");
          cy.get("input#iban").clear().type("IT60X0542811101000000123456");

          cy.dataQa("payment-modal-next").click();
          cy.dataQa("manual-payment-modal-terms").should(
            "contain",
            "you must accept terms and conditions"
          );
        });
        it("clicking on next button, if the name is filled, the iban is filled with a valid iban and the checkbox is checked, should go to the third step", () => {
          cy.get("input#bankaccountOwner").clear().type("ciccio paguro");
          cy.get("input#iban").clear().type("IT60X0542811101000000123456");
          cy.get("#termsAcceptance").check();
          cy.dataQa("payment-modal-next").click();
          cy.dataQa("manual-payment-modal-step-3").should("be.visible");
        });
      });

      describe("Payment request modal third step", () => {
        beforeEach(() => {
          cy.intercept(
            "POST",
            `${Cypress.env("REACT_APP_API_URL")}/users/me/payments`,
            {
              statusCode: 200,
              fixture: "users/me/payments/_post/200",
            }
          ).as("postUserMePayment");

          cy.dataQa("request-payment-cta").click();
          cy.dataQa("payment-modal-next").should("be.visible");
          cy.dataQa("payment-modal-next").click();
          cy.get("input#bankaccountOwner").clear().type("ciccio paguro");
          cy.get("input#iban").clear().type("IT60X0542811101000000123456");
          cy.get("#termsAcceptance").check();
          cy.dataQa("payment-modal-next").click();
        });
        it("in the third step is visible the amount gross, an explanatory text, a button to go back and a button to start the payment process", () => {
          cy.dataQa("manual-payment-modal-step-3").should("be.visible");
          cy.dataQa("manual-payment-modal-amount").should("be.visible");
          cy.dataQa("manual-payment-modal-intro-text").should("be.visible");
          cy.dataQa("payment-modal-back").should("be.visible");
          cy.dataQa("payment-modal-next").should("be.visible");
        });
        it("in the third step if the back button is pressed, should go to the first step", () => {
          cy.dataQa("payment-modal-back").click();
          cy.dataQa("manual-payment-modal-step-1").should("be.visible");
        });
        it("in the third step if the process payment is pressed, should call the POST /users/me/payment with the iban and the account name in the body", () => {
          cy.dataQa("payment-modal-next").click();

          // expect the api call to be called with the correct body
          cy.get("@postUserMePayment")
            .its("request.body")
            .should("deep.equal", {
              method: {
                type: "iban",
                accountHolderName: "ciccio paguro",
                iban: "IT60X0542811101000000123456",
              },
            });
        });

        describe("during the api call", () => {
          beforeEach(() => {
            cy.intercept(
              "POST",
              `${Cypress.env("REACT_APP_API_URL")}/users/me/payments`,
              {
                delayMs: 4000,
                statusCode: 200,
                fixture: "users/me/payments/_post/200",
              }
            ).as("postUserMePayment");
          });
          it("in the third step if the process payment is pressed, while the api call is being executed, the process payment button and back button are disabled and there is a loading text", () => {
            cy.dataQa("payment-modal-next").click();
            cy.dataQa("payment-modal-next").should("be.disabled");
            cy.dataQa("payment-modal-back").should("be.disabled");
            cy.dataQa("payment-modal-next").should("contain", "wait");
          });
        });

        describe("after a successful api call", () => {
          beforeEach(() => {
            cy.intercept(
              "POST",
              `${Cypress.env("REACT_APP_API_URL")}/users/me/payments`,
              {
                statusCode: 200,
                fixture: "users/me/payments/_post/200",
              }
            ).as("postUserMePayment");
          });
          it("in the third step if the process payment is pressed, if the api call is successful, should show the third step", () => {
            cy.dataQa("payment-modal-next").click();
            cy.dataQa("manual-payment-modal-step-4").should("be.visible");
          });
          it("the request a payment button should be disabled", () => {
            cy.intercept(
              "GET",
              `${Cypress.env("REACT_APP_API_URL")}/users/me/payments*`,
              {
                statusCode: 200,
                fixture: "users/me/payments/_get/200_paid-and-processing",
              }
            ).as("getUserMePayment");
            cy.dataQa("payment-modal-next").click();
            cy.dataQa("manual-payment-modal-step-4").should("be.visible");
            cy.dataQa("payment-modal").find(".modal-close").click();

            cy.dataQa("request-payment-cta").should("be.disabled");
          });
        });

        describe("after a unsuccessful api call", () => {
          beforeEach(() => {
            cy.intercept(
              "POST",
              `${Cypress.env("REACT_APP_API_URL")}/users/me/payments`,
              {
                statusCode: 403,
                fixture: "users/me/payments/_post/200",
              }
            ).as("postUserMePayment");
          });
          it("in the third step if the process payment is pressed, if the api call is not successful, show a toastr and reenable the button", () => {
            cy.dataQa("payment-modal-next").click();
            cy.dataQa("manual-payment-modal-step-4").should("not.exist");
            cy.dataQa("manual-payment-error-toastr").should("be.visible");
            cy.dataQa("payment-modal-next").should("not.be.disabled");
            cy.dataQa("payment-modal-back").should("not.be.disabled");
          });
        });
      });
      describe("Payment request modal fourth step", () => {
        beforeEach(() => {
          cy.intercept(
            "POST",
            `${Cypress.env("REACT_APP_API_URL")}/users/me/payments`,
            {
              statusCode: 200,
              fixture: "users/me/payments/_post/200",
            }
          ).as("postUserMePayment");
          cy.intercept(
            "GET",
            `${Cypress.env("REACT_APP_API_URL")}/users/me/payments*`,
            {
              statusCode: 200,
              fixture: "users/me/payments/_get/200_single-paid-payment",
            }
          ).as("getUserMePayment");

          cy.wait("@getUserMePayment");
          cy.dataQa("request-payment-cta").click();
          cy.dataQa("payment-modal-next").should("be.visible");
          cy.dataQa("payment-modal-next").click();
          cy.get("input#bankaccountOwner").clear().type("ciccio paguro");
          cy.get("input#iban").clear().type("IT60X0542811101000000123456");
          cy.get("#termsAcceptance").check();
          cy.dataQa("payment-modal-next").click();
          cy.dataQa("payment-modal-next").click();
        });
        it("is visible an explanatory text", () => {
          cy.dataQa("manual-payment-modal-step-4").should("be.visible");
          cy.dataQa("manual-payment-modal-success-text").should("be.visible");
        });
        it("there should not be next and back buttons", () => {
          cy.dataQa("manual-payment-modal-step-4").should("be.visible");
          cy.dataQa("manual-payment-modal-success-text").should("be.visible");
          cy.dataQa("payment-modal-next").should("not.exist");
          cy.dataQa("payment-modal-back").should("not.exist");
        });
        it("if the payment is successful, a get to the /users/me/payments should be executed", () => {
          cy.dataQa("manual-payment-modal-step-4").should("be.visible");
          cy.wait("@getUserMePayment").then((interception) => {
            assert.isNotNull(
              interception.response.body,
              "API call to get the payment should be executed"
            );
          });
        });
      });
    });
  });

  describe("No fiscal profile", () => {
    beforeEach(() => {
      cy.intercept(
        "GET",
        `${Cypress.env("REACT_APP_API_URL")}/users/me/fiscal`,
        {
          statusCode: 404,
          fixture: `users/me/fiscal/_get/404_not-found`,
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

    describe("Payment request button", () => {
      it(`The button to request payments is disabled`, () => {
        cy.dataQa("request-payment-cta").should("be.disabled");
      });
    });
  });
});
