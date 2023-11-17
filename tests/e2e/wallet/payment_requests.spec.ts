/* eslint-disable jest/no-identical-title */
import { test, expect } from "@playwright/test";
import { WalletPage } from "../../fixtures/WalletPage";

//For Users with profile type witholding > 5K, VAT, Company and internal
test.describe("Payment request", () => {
  const fiscalTypes_forManualPayments = [
    {
      key: "vat",
      name: "Partita IVA Forfettaria",
      translationKey: `Fiscal types:::VAT`,
    },
    {
      key: "witholding-extra",
      name: ">5k",
      translationKey: `Fiscal types:::Witholding > 5000€`,
    },
    {
      key: "company",
      name: "Partita IVA Ordinaria",
      translationKey: `Fiscal types:::Company`,
    },
    {
      key: "internal",
      name: "Dipendente",
      translationKey: `Fiscal types:::Internal employee`,
    },
  ];
  const fiscalTypes_forAutomaticPayments = [
    {
      key: "non-italian",
      name: "Straniero",
      translationKey: `Fiscal types:::Foreign`,
    },
    {
      key: "withholding",
      name: "less than € 5.000 gross / year with occasional services",
      translationKey: `Fiscal types:::Witholding < 5000€`,
    },
  ];
  let walletPage: WalletPage;
  test.beforeEach(async ({ page }) => {
    walletPage = new WalletPage(page);
    await walletPage.loggedIn();
  });
  fiscalTypes_forManualPayments.forEach((fiscalType) => {
    test.describe(` for fiscal type ${fiscalType.name}`, () => {
      test.beforeEach(async () => {
        switch (fiscalType.key) {
          case "vat":
            await walletPage.vatFiscalType();
            break;
          case "witholding-extra":
            await walletPage.witholdingExtraFiscalType();
            break;
          case "company":
            await walletPage.companyFiscalType();
            break;
          case "internal":
            await walletPage.internalFiscalType();
            break;
          default:
            throw new Error(`Fiscal type ${fiscalType.key} not found`);
        }
        await walletPage.grossPendingBooty();
        await walletPage.genericUserMePayments();
        await walletPage.visit();
      });

      test.describe("Payment request button", () => {
        test(`The button to request payments is enabled`, async ({ page }) => {
          await expect(page.getByTestId("request-payment-cta")).toBeEnabled();
        });
        test("clicking on the button a manual payment request is opened", async ({
          page,
        }) => {
          walletPage.requestPayment();
          await expect(page.getByTestId("manual-payment-modal")).toBeVisible();
        });
      });

      test.describe("Manual Payment request modal first step", () => {
        test.beforeEach(async () => {
          await walletPage.requestPayment();
        });

        test("in first step is visible a recap of your fiscal profile and a next button", async ({
          page,
        }) => {
          await expect(
            page.getByTestId("manual-payment-fiscal-profile-recap")
          ).toBeVisible();
          await expect(page.getByTestId("payment-modal-next")).toBeVisible();
        });

        test("in first step, clicking on the next button should show the second step", async ({
          page,
        }) => {
          await expect(page.getByTestId("payment-modal-next")).toBeVisible();
          await page.getByTestId("payment-modal-next").click();
          await expect(
            page.getByTestId("manual-payment-modal-step-1")
          ).toBeVisible();
        });

        test("should contain fiscal profile name", async ({ page }) => {
          await expect(
            page.getByTestId("manual-payment-fiscal-profile-recap")
          ).toContainText(fiscalType.translationKey);
        });
      });

      test.describe("Manual Payment request modal second step", () => {
        test.beforeEach(async ({ page }) => {
          await walletPage.requestPayment();
          await page.getByTestId("payment-modal-next").click();
        });

        test("is visible an explanatory text, name field, iban field, terms acceptance checkbox, a back and a continue btn", async ({
          page,
        }) => {
          await expect(page.locator("input#bankaccountOwner")).toBeVisible();
          await expect(page.locator("input#iban")).toBeVisible();
          await expect(
            page.locator("input[name='termsAcceptance']")
          ).toBeVisible();
          await expect(page.getByTestId("payment-modal-back")).toBeVisible();
          await expect(page.getByTestId("payment-modal-next")).toBeVisible();
        });

        test('click on the link "Terms and conditions" open a link in a new tab', async ({
          page,
        }) => {
          await expect(
            page.getByTestId("manual-payment-modal-terms-and-conditions-link")
          ).toBeVisible();
          await expect(
            page.getByTestId("manual-payment-modal-terms-and-conditions-link")
          ).toHaveAttribute("target", "_blank");
        });

        test("clicking on next button, if the name field is empty, should print an error under the field", async ({
          page,
        }) => {
          await page.getByTestId("payment-modal-next").click();
          await page.locator("input#iban").fill("IT60X0542811101000000123456");
          await page.locator("#termsAcceptance").check();
          await page.getByTestId("payment-modal-next").click();
          await expect(
            page.getByTestId("manual-payment-modal-account-holder")
          ).toContainText("This is a required field");
        });

        test("clicking on next button, if the iban field is not a valid iban, should print an error under the field", async ({
          page,
        }) => {
          await page.getByTestId("payment-modal-next").click();

          await page.locator("input#bankaccountOwner").fill("ciccio paguro");
          await page.locator("input#iban").fill("wrong iban");
          await page.locator("#termsAcceptance").check();
          await page.getByTestId("payment-modal-next").click();
          await expect(
            page.getByTestId("manual-payment-modal-iban")
          ).toContainText("This is an invalid format.");
        });

        test("clicking on next button, if the iban field is empty, should print an error under the field", async ({
          page,
        }) => {
          await page.getByTestId("payment-modal-next").click();

          await page.locator("input#bankaccountOwner").fill("ciccio paguro");
          await page.locator("#termsAcceptance").check();
          await page.getByTestId("payment-modal-next").click();
          await expect(
            page.getByTestId("manual-payment-modal-iban")
          ).toContainText("This is a required field");
        });

        test("clicking on next button, if the terms and condition checkbox is not checked, should print an error under the field", async ({
          page,
        }) => {
          await page.locator("input#bankaccountOwner").fill("ciccio paguro");
          await page.locator("input#iban").fill("IT60X0542811101000000123456");

          await page.getByTestId("payment-modal-next").click();
          await expect(
            page.getByTestId("manual-payment-modal-terms")
          ).toContainText("you must accept terms and conditions");
        });
        test("clicking on next button, if the name is filled, the iban is filled with a valid iban and the checkbox is checked, should go to the third step", async ({
          page,
        }) => {
          await page.locator("input#bankaccountOwner").fill("ciccio paguro");
          await page.locator("input#iban").fill("IT60X0542811101000000123456");
          await page.locator("#termsAcceptance").check();
          await page.getByTestId("payment-modal-next").click();
          await expect(
            page.getByTestId("manual-payment-modal-step-3")
          ).toBeVisible();
        });
      });

      test.describe("Manual Payment request modal third step", () => {
        test.beforeEach(async ({ page }) => {
          await walletPage.postUsersMePayments();

          await walletPage.requestPayment();
          await expect(page.getByTestId("payment-modal-next")).toBeVisible();
          await page.getByTestId("payment-modal-next").click();
          await page.locator("input#bankaccountOwner").fill("ciccio paguro");
          await page.locator("input#iban").fill("IT60X0542811101000000123456");
          await page.locator("#termsAcceptance").check();
          await page.getByTestId("payment-modal-next").click();
        });
        test("in the third step is visible the amount gross, an explanatory text, a button to go back and a button to start the payment process", async ({
          page,
        }) => {
          await expect(
            page.getByTestId("manual-payment-modal-step-3")
          ).toBeVisible();
          await expect(
            page.getByTestId("manual-payment-modal-amount")
          ).toBeVisible();
          await expect(
            page.getByTestId("manual-payment-modal-intro-text")
          ).toBeVisible();
          await expect(page.getByTestId("payment-modal-back")).toBeVisible();
          await expect(page.getByTestId("payment-modal-next")).toBeVisible();
        });
        test("in the third step if the back button is pressed, should go to the first step", async ({
          page,
        }) => {
          await page.getByTestId("payment-modal-back").click();
          await expect(
            page.getByTestId("manual-payment-modal-step-1")
          ).toBeVisible();
        });
        test("in the third step if the process payment is pressed, should call the POST /users/me/payment with the iban and the account name in the body", async ({
          page,
        }) => {
          await page.getByTestId("payment-modal-next").click();

          page.on("request", (request) => {
            if (
              request.url().includes("api/users/me/payments") &&
              request.method() === "POST"
            ) {
              // eslint-disable-next-line jest/no-conditional-expect
              expect(request.postData()).toEqual({
                method: {
                  type: "iban",
                  accountHolderName: "ciccio paguro",
                  iban: "IT60X0542811101000000123456",
                },
              });
            }
          });

          test.describe("during the api call", () => {
            test.beforeEach(async ({ page }) => {
              await walletPage.postUsersMePayments({ delay: 4000 });
            });
            test("in the third step if the process payment is pressed, while the api call is being executed, the process payment button and back button are disabled and there is a loading text", async ({
              page,
            }) => {
              await page.getByTestId("payment-modal-next").click();
              await expect(
                page.getByTestId("payment-modal-next")
              ).toBeDisabled();
              await expect(
                page.getByTestId("payment-modal-back")
              ).toBeDisabled();
              await expect(
                page.getByTestId("payment-modal-next")
              ).toContainText("wait");
            });
          });

          test.describe("after a successful api call", () => {
            test.beforeEach(async ({ page }) => {
              await walletPage.postUsersMePayments();
            });
            test("in the third step if the process payment is pressed, if the api call is successful, should show the third step", async ({
              page,
            }) => {
              await page.getByTestId("payment-modal-next").click();
              await expect(
                page.getByTestId("manual-payment-modal-step-4")
              ).toBeVisible();
            });
            test("the request a payment button should be disabled", async ({
              page,
            }) => {
              await page.route("*/**/api/users/me/payments*", async (route) => {
                await route.fulfill({
                  path: "users/me/payments/_get/200_paid-and-processing",
                });
              });
              await page.getByTestId("payment-modal-next").click();
              await expect(
                page.getByTestId("manual-payment-modal-step-4")
              ).toBeVisible();
              await page
                .getByTestId("payment-modal")
                .locator(".modal-close")
                .click();

              await expect(
                page.getByTestId("request-payment-cta")
              ).toBeDisabled();
            });
            test("the booty should be empty", async ({ page }) => {
              await page.route("*/**/api/users/me/payments*", async (route) => {
                await route.fulfill({
                  path: "users/me/payments/_get/200_paid-and-processing",
                });
              });
              await walletPage.emptyPendingBooty();
              await page.getByTestId("payment-modal-next").click();
              await expect(
                page.getByTestId("manual-payment-modal-step-4")
              ).toBeVisible();
              await page
                .getByTestId("payment-modal")
                .locator(".modal-close")
                .click();

              const walletManagement = page.getByTestId("wallet-management");

              await expect(
                walletManagement.getByTestId("net-booty")
              ).toHaveCount(0);
              await expect(
                walletManagement.getByTestId("gross-booty")
              ).toBeVisible();
              await expect(
                walletManagement.getByTestId("gross-booty")
              ).toContainText("0.00");
              await expect(
                walletManagement.getByTestId("wallet-pending-booty")
              ).toHaveClass("aq-text-disabled-dark");
            });
          });
        });

        test.describe("after a unsuccessful api call", () => {
          test.beforeEach(async ({ page }) => {
            await walletPage.postUsersMePayments({ fail: 403 });
          });
          test("in the third step if the process payment is pressed, if the api call is not successful, show a toastr and reenable the button", async ({
            page,
          }) => {
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("manual-payment-modal-step-4")
            ).toHaveCount(0);
            await expect(
              page.getByTestId("manual-payment-error-toastr")
            ).toBeVisible();
            await expect(
              page.getByTestId("payment-modal-next")
            ).not.toBeDisabled();
            await expect(
              page.getByTestId("payment-modal-back")
            ).not.toBeDisabled();
          });
        });
      });

      test.describe("Manual Payment request modal fourth step", () => {
        test.beforeEach(async ({ page }) => {
          await walletPage.postUsersMePayments();
          await walletPage.requestPayment();
          await expect(page.getByTestId("payment-modal-next")).toBeVisible();
          await page.getByTestId("payment-modal-next").click();
          await page.locator("input#bankaccountOwner").fill("ciccio paguro");
          await page.locator("input#iban").fill("IT60X0542811101000000123456");
          await page.locator("#termsAcceptance").check();
          await page.getByTestId("payment-modal-next").click();
          await page.getByTestId("payment-modal-next").click();
        });
        test("is visible an explanatory text", async ({ page }) => {
          await expect(
            page.getByTestId("manual-payment-modal-step-4")
          ).toBeVisible();
          await expect(
            page.getByTestId("manual-payment-modal-success-text")
          ).toBeVisible();
        });
        test("there should not be next and back buttons", async ({ page }) => {
          await expect(
            page.getByTestId("manual-payment-modal-step-4")
          ).toBeVisible();
          await expect(
            page.getByTestId("manual-payment-modal-success-text")
          ).toBeVisible();
          await expect(page.getByTestId("payment-modal-next")).toHaveCount(0);
          await expect(page.getByTestId("payment-modal-back")).toHaveCount(0);
        });
        test("if the payment is successful, a get to the /users/me/payments should be executed", async ({
          page,
        }) => {
          let count = 0;
          page.on("request", (request) => {
            if (
              request.url().includes("/users/me/payments") &&
              request.method() === "GET"
            ) {
              count++;
            }
          });
          await expect(
            page.getByTestId("manual-payment-modal-step-4")
          ).toBeVisible();
          expect(count).toBe(1);
        });
      });
    });
  });
  fiscalTypes_forAutomaticPayments.forEach((fiscalType) => {
    test.describe(` for fiscal type ${fiscalType.name}`, () => {
      test.beforeEach(async ({ page }) => {
        switch (fiscalType.key) {
          case "non-italian":
            await walletPage.nonItalianFiscalType();
            break;
          case "withholding":
            await walletPage.witholdingFiscalType();
            break;
          default:
            throw new Error(`Fiscal type ${fiscalType.key} not found`);
        }

        await walletPage.netPendingBooty();
        await walletPage.genericUserMePayments();
        await walletPage.visit();
      });

      test.describe("Payment request button", () => {
        // eslint-disable-next-line jest/no-identical-title
        test("The button to request payments is enabled", async ({ page }) => {
          await expect(page.getByTestId("request-payment-cta")).toBeEnabled();
        });
        test("clicking on the button an automatic payment request is opened", async ({
          page,
        }) => {
          await walletPage.requestPayment();
          await expect(
            page.getByTestId("automatic-payment-modal")
          ).toBeVisible();
        });
      });
      test.describe("Automatic Payment request modal first step", () => {
        test.beforeEach(async ({ page }) => {
          await walletPage.requestPayment();
        });

        test("in first step is visible a list of next steps, fields to chose from available payments methods, a recap of your fiscal profile and a next button", async ({
          page,
        }) => {
          await expect(
            page.getByTestId("automatic-payment-next-steps")
          ).toBeVisible();
          await expect(page.locator("[name='paymentMethod']")).toBeVisible();
          await expect(
            page.getByTestId("automatic-payment-fiscal-profile")
          ).toBeVisible();
          await expect(page.getByTestId("payment-modal-next")).toBeVisible();
        });

        // eslint-disable-next-line jest/no-identical-title
        test("should contain fiscal profile name", async ({ page }) => {
          await expect(
            page.getByTestId("automatic-payment-fiscal-profile")
          ).toContainText(fiscalType.translationKey);
        });

        test("in first step, selecting a payment method and clicking on the next button should show the second step", async ({
          page,
        }) => {
          await expect(page.getByTestId("payment-modal-next")).toBeVisible();
          await page.locator("[name='paymentMethod'][value='paypal']").click();
          await page.getByTestId("payment-modal-next").click();
          await expect(
            page.getByTestId("automatic-payment-modal-step-1")
          ).toBeVisible();
        });
      });

      test.describe("Automatic Payment request modal second step", () => {
        test.describe("Paypal", () => {
          test.beforeEach(async ({ page }) => {
            await walletPage.requestPayment();
            await page
              .locator("[name='paymentMethod'][value='paypal']")
              .click();
            await page.getByTestId("payment-modal-next").click();
          });

          test("is visible an email field, a confirm email field, terms acceptance checkbox, a back and a continue btn", async ({
            page,
          }) => {
            await expect(
              page.getByTestId("automatic-payment-modal-step-1")
            ).toBeVisible();
            await expect(page.locator("[name='ppAccountOwner']")).toBeVisible();
            await expect(page.locator("[name='confirmEmail']")).toBeVisible();
            await expect(page.locator("#termsAcceptance")).toBeVisible();
            await expect(page.getByTestId("payment-modal-back")).toBeVisible();
            await expect(page.getByTestId("payment-modal-next")).toBeVisible();
          });

          // eslint-disable-next-line jest/no-identical-title
          test('click on the link "Terms and conditions" open a link in a new tab', async ({
            page,
          }) => {
            await expect(
              page.getByTestId("automatic-payment-modal-terms")
            ).toBeVisible();
            await expect(
              page.getByTestId("automatic-payment-modal-terms-link")
            ).toHaveAttribute("target", "_blank");
          });

          test("clicking on next button, if the email field is empty, should print an error under the field", async ({
            page,
          }) => {
            await page.locator("[name='confirmEmail']").fill("e@mail.it");
            await page.locator("#termsAcceptance").click();
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-modal")
            ).toContainText("This is a required field");
          });

          test("clicking on next button, if the confirm email field is empty, should print an error under the field", async ({
            page,
          }) => {
            await page.locator("[name='ppAccountOwner']").fill("e@mail.it");
            await page.locator("#termsAcceptance").click({ force: true });
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-modal")
            ).toContainText("This is a required field");
          });

          test("clicking on next button, if the confirm email is different, should print an error under the field", async ({
            page,
          }) => {
            await page.locator("[name='ppAccountOwner']").fill("e@mail.it");
            await page.locator("[name='confirmEmail']").fill("m@il.it");
            await page.locator("#termsAcceptance").click({ force: true });
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-modal")
            ).toContainText("email must be the same");
          });

          // eslint-disable-next-line jest/no-identical-title
          test("clicking on next button, if the terms and condition checkbox is not checked, should print an error under the field", async ({
            page,
          }) => {
            await page.locator("[name='ppAccountOwner']").fill("e@mail.it");
            await page.locator("[name='confirmEmail']").fill("e@mail.it");
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-modal-terms")
            ).toContainText("you must accept terms and conditions");
          });

          test("clicking on next button, if emails are filled and the checkbox is checked, should go to the third step", async ({
            page,
          }) => {
            await page.locator("[name='ppAccountOwner']").fill("e@mail.it");
            await page.locator("[name='confirmEmail']").fill("e@mail.it");
            await page.locator("#termsAcceptance").check();
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-modal-step-3")
            ).toBeVisible();
          });
        });
        test.describe("Bank Account", () => {
          test.beforeEach(async ({ page }) => {
            await walletPage.requestPayment();
            await page.locator("[name='paymentMethod'][value='bank']").click();
            await page.getByTestId("payment-modal-next").click();
          });

          test("is visible a name field, an iban field, terms acceptance checkbox, a back and a continue btn", async ({
            page,
          }) => {
            await expect(
              page.getByTestId("automatic-payment-modal-step-1")
            ).toBeVisible();
            await expect(
              page.locator("[name='bankaccountOwner']")
            ).toBeVisible();
            await expect(page.locator("[name='iban']")).toBeVisible();
            await expect(page.locator("#termsAcceptance")).toBeVisible();
            await expect(page.getByTestId("payment-modal-back")).toBeVisible();
            await expect(page.getByTestId("payment-modal-next")).toBeVisible();
          });

          // eslint-disable-next-line jest/no-identical-title
          test('click on the link "Terms and conditions" open a link in a new tab', async ({
            page,
          }) => {
            await expect(
              page.getByTestId("automatic-payment-modal-terms")
            ).toBeVisible();
            await expect(
              page.getByTestId("automatic-payment-modal-terms-link")
            ).toHaveAttribute("target", "_blank");
          });

          // eslint-disable-next-line jest/no-identical-title
          test("clicking on next button, if the name field is empty, should print an error under the field", async ({
            page,
          }) => {
            await page
              .locator("input#iban")
              .fill("IT60X0542811101000000123456");
            await page.locator("#termsAcceptance").check();
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-bank")
            ).toContainText("This is a required field");
          });

          // eslint-disable-next-line jest/no-identical-title
          test("clicking on next button, if the iban field is not a valid iban, should print an error under the field", async ({
            page,
          }) => {
            await page.locator("input#bankaccountOwner").fill("ciccio paguro");
            await page.locator("input#iban").fill("wrong iban");
            await page.locator("#termsAcceptance").check();
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-bank")
            ).toContainText("This is an invalid format.");
          });

          // eslint-disable-next-line jest/no-identical-title
          test("clicking on next button, if the iban field is empty, should print an error under the field", async ({
            page,
          }) => {
            await page.locator("input#bankaccountOwner").fill("ciccio paguro");
            await page.locator("#termsAcceptance").check();
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-bank")
            ).toContainText("This is a required field");
          });

          // eslint-disable-next-line jest/no-identical-title
          test("clicking on next button, if the terms and condition checkbox is not checked, should print an error under the field", async ({
            page,
          }) => {
            await page.locator("input#bankaccountOwner").fill("ciccio paguro");
            await page
              .locator("input#iban")
              .fill("IT60X0542811101000000123456");

            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-modal-terms")
            ).toContainText("you must accept terms and conditions");
          });

          // eslint-disable-next-line jest/no-identical-title
          test("clicking on next button, if the name is filled, the iban is filled with a valid iban and the checkbox is checked, should go to the third step", async ({
            page,
          }) => {
            await page.locator("input#bankaccountOwner").fill("ciccio paguro");
            await page
              .locator("input#iban")
              .fill("IT60X0542811101000000123456");
            await page.locator("#termsAcceptance").check();
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("automatic-payment-modal-step-3")
            ).toBeVisible();
          });
        });
      });

      test.describe("Automatic Payment request modal third step", () => {
        test.beforeEach(async ({ page }) => {
          await walletPage.postUsersMePayments();
          await walletPage.requestPayment();
          await walletPage.getUsersMeBootyBirthdate();
        });
        test.describe("Paypal", () => {
          test.beforeEach(async ({ page }) => {
            await page
              .locator("[name='paymentMethod'][value='paypal']")
              .click();
            await page.getByTestId("payment-modal-next").click();
            await page.locator("[name='ppAccountOwner']").fill("e@mail.it");
            await page.locator("[name='confirmEmail']").fill("e@mail.it");
            await page.locator("#termsAcceptance").check();
            await page.getByTestId("payment-modal-next").click();
          });

          test("In the third step is visible amount gross and net, paypal email and reacp of fiscal profile informations", async ({
            page,
          }) => {
            const modalStep3 = page.getByTestId(
              "automatic-payment-modal-step-3"
            );
            await expect(
              modalStep3.getByTestId("payment-modal-net-booty")
            ).toBeVisible();
            await expect(modalStep3.getByTestId("pp-email")).toBeVisible();
            await expect(
              modalStep3.getByTestId(`fiscalType-${fiscalType.key}`)
            ).toContainText(fiscalType.translationKey);
            await expect(page.getByTestId("taxID-number")).toBeVisible();
            await expect(page.getByTestId("birthDate")).toBeVisible();
            await expect(page.getByTestId("fiscalAddress")).toBeVisible();
          });

          // eslint-disable-next-line jest/no-identical-title
          test("in the third step if the back button is pressed, should go to the first step", async ({
            page,
          }) => {
            await page.getByTestId("payment-modal-back").click();
            await expect(
              page.getByTestId("automatic-payment-modal-step-1")
            ).toBeVisible();
          });
          test("in the third step if the process payment is pressed, should call the POST /users/me/payment with the email in the body", async ({
            page,
          }) => {
            await page.getByTestId("payment-modal-submit").click();

            page.on("request", (request) => {
              if (
                request.url().includes("api/users/me/payments") &&
                request.method() === "POST"
              ) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(request.postData()).toEqual({
                  method: {
                    type: "paypal",
                    email: "e@mail.it",
                  },
                });
              }
            });
          });

          test.describe("during the api call", () => {
            test.beforeEach(async () => {
              await walletPage.postUsersMePayments({ delay: 4000 });
            });
            // eslint-disable-next-line jest/no-identical-title
            test("in the third step if the process payment is pressed, while the api call is being executed, the process payment button and back button are disabled and there is a loading text", async ({
              page,
            }) => {
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("payment-modal-submit")
              ).toBeDisabled();
              await expect(
                page.getByTestId("payment-modal-back")
              ).toBeDisabled();
              await expect(
                page.getByTestId("payment-modal-submit")
              ).toContainText("wait");
            });
          });

          test.describe("after a successful api call", () => {
            test.beforeEach(async () => {
              await walletPage.postUsersMePayments();
            });
            // eslint-disable-next-line jest/no-identical-title
            test("in the third step if the process payment is pressed, if the api call is successful, should show the third step", async ({
              page,
            }) => {
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("automatic-payment-modal-step-4")
              ).toBeVisible();
            });
            // eslint-disable-next-line jest/no-identical-title
            test("the request a payment button should be disabled", async ({
              page,
            }) => {
              await walletPage.tablePaymentsPaidAndProcessing();
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("automatic-payment-modal-step-4")
              ).toBeVisible();
              await page
                .getByTestId("payment-modal")
                .locator(".modal-close")
                .click();

              await expect(
                page.getByTestId("request-payment-cta")
              ).toBeDisabled();
            });
            // eslint-disable-next-line jest/no-identical-title
            test("the booty should be empty", async ({ page }) => {
              await walletPage.tablePaymentsPaidAndProcessing();
              await walletPage.emptyPendingBooty();
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("automatic-payment-modal-step-4")
              ).toBeVisible();
              await page
                .getByTestId("payment-modal")
                .locator(".modal-close")
                .click();

              const walletManagement = page.getByTestId("wallet-management");

              await expect(
                walletManagement.getByTestId("net-booty")
              ).toBeVisible();
              await expect(
                walletManagement.getByTestId("net-booty")
              ).toContainText("0.00");
              await expect(
                walletManagement.getByTestId("gross-booty")
              ).toBeVisible();
              await expect(
                walletManagement.getByTestId("gross-booty")
              ).toContainText("0.00");
              await expect(
                walletManagement.getByTestId("wallet-pending-booty")
              ).toHaveClass("aq-text-disabled-dark");
            });
          });

          test.describe("after a unsuccessful api call", () => {
            test.beforeEach(async () => {
              walletPage.postUsersMePayments({ fail: 403 });
            });
            // eslint-disable-next-line jest/no-identical-title
            test("in the third step if the process payment is pressed, if the api call is not successful, show a toastr and reenable the button", async ({
              page,
            }) => {
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("automatic-payment-modal-step-4")
              ).toHaveCount(0);
              await expect(
                page.getByTestId("modal-payment-error-toastr")
              ).toBeVisible();
              await expect(
                page.getByTestId("payment-modal-submit")
              ).not.toBeDisabled();
              await expect(
                page.getByTestId("payment-modal-back")
              ).not.toBeDisabled();
            });
          });
        });
        test.describe("Bank Account", () => {
          test.beforeEach(async ({ page }) => {
            await page.locator("[name='paymentMethod'][value='bank']").click();
            await page.getByTestId("payment-modal-next").click();
            await page.locator("input#bankaccountOwner").fill("ciccio paguro");
            await page
              .locator("input#iban")
              .fill("IT60X0542811101000000123456");
            await page.locator("#termsAcceptance").check();
            await page.getByTestId("payment-modal-next").click();
          });

          test("In the third step is visible amount gross and net, bank account holder, iban, and reacp of fiscal profile informations", async ({
            page,
          }) => {
            const modalStep3 = page.getByTestId(
              "automatic-payment-modal-step-3"
            );

            await expect(
              modalStep3.getByTestId("payment-modal-net-booty")
            ).toBeVisible();
            await expect(
              modalStep3.getByTestId("bankAccount-owner")
            ).toBeVisible();
            await expect(
              modalStep3.getByTestId("bankAccount-iban")
            ).toBeVisible();
            await expect(
              modalStep3.getByTestId(`fiscalType-${fiscalType.key}`)
            ).toContainText(fiscalType.translationKey);
            await expect(modalStep3.getByTestId("taxID-number")).toBeVisible();
            await expect(modalStep3.getByTestId("birthDate")).toBeVisible();
            await expect(modalStep3.getByTestId("fiscalAddress")).toBeVisible();
          });
          // eslint-disable-next-line jest/no-identical-title
          test("in the third step if the back button is pressed, should go to the first step", async ({
            page,
          }) => {
            await page.getByTestId("payment-modal-back").click();
            await expect(
              page.getByTestId("automatic-payment-modal-step-1")
            ).toBeVisible();
          });
          // eslint-disable-next-line jest/no-identical-title
          test("in the third step if the process payment is pressed, should call the POST /users/me/payment with the email in the body", async ({
            page,
          }) => {
            await page.getByTestId("payment-modal-submit").click();

            // expect the api call to be called with the correct body
            page.on("request", (request) => {
              if (
                request.url().includes("api/users/me/payments") &&
                request.method() === "POST"
              ) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(request.postData()).toEqual({
                  method: {
                    type: "iban",
                    iban: "IT60X0542811101000000123456",
                    accountHolderName: "ciccio paguro",
                  },
                });
              }
            });
          });

          test.describe("during the api call", () => {
            test.beforeEach(async ({ page }) => {
              await walletPage.postUsersMePayments({ delay: 4000 });
            });
            test("in the third step if the process payment is pressed, while the api call is being executed, the process payment button and back button are disabled and there is a loading text", async ({
              page,
            }) => {
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("payment-modal-submit")
              ).toBeDisabled();
              await expect(
                page.getByTestId("payment-modal-back")
              ).toBeDisabled();
              await expect(
                page.getByTestId("payment-modal-submit")
              ).toContainText("wait");
            });
          });

          test.describe("after a successful api call", () => {
            test.beforeEach(async () => {
              await walletPage.postUsersMePayments();
            });
            test("in the third step if the process payment is pressed, if the api call is successful, should show the third step", async ({
              page,
            }) => {
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("automatic-payment-modal-step-4")
              ).toBeVisible();
            });
            // eslint-disable-next-line jest/no-identical-title
            test("the request a payment button should be disabled", async ({
              page,
            }) => {
              await walletPage.tablePaymentsPaidAndProcessing();
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("automatic-payment-modal-step-4")
              ).toBeVisible();
              await page
                .getByTestId("payment-modal")
                .locator(".modal-close")
                .click();

              await expect(
                page.getByTestId("request-payment-cta")
              ).toBeDisabled();
            });
            test("the booty should be empty", async ({ page }) => {
              await walletPage.tablePaymentsPaidAndProcessing();
              await walletPage.emptyPendingBooty();
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("automatic-payment-modal-step-4")
              ).toBeVisible();
              await page
                .getByTestId("payment-modal")
                .locator(".modal-close")
                .click();

              const walletManagement = page.getByTestId("wallet-management");

              await expect(
                walletManagement.getByTestId("net-booty")
              ).toBeVisible();
              await expect(
                walletManagement.getByTestId("net-booty")
              ).toContainText("0.00");
              await expect(
                walletManagement.getByTestId("gross-booty")
              ).toBeVisible();
              await expect(
                walletManagement.getByTestId("gross-booty")
              ).toContainText("0.00");
              await expect(
                walletManagement.getByTestId("wallet-pending-booty")
              ).toHaveClass("aq-text-disabled-dark");
            });
          });

          test.describe("after a unsuccessful api call", () => {
            test.beforeEach(async () => {
              walletPage.postUsersMePayments({ fail: 403 });
            });
            // eslint-disable-next-line jest/no-identical-title
            test("in the third step if submit is pressed, if the api call is not successful, show a toastr and reenable the button", async ({
              page,
            }) => {
              await page.getByTestId("payment-modal-submit").click();
              await expect(
                page.getByTestId("automatic-payment-modal-step-4")
              ).toHaveCount(0);
              await expect(
                page.getByTestId("modal-payment-error-toastr")
              ).toBeVisible();
              await expect(
                page.getByTestId("payment-modal-submit")
              ).not.toBeDisabled();
              await expect(
                page.getByTestId("payment-modal-back")
              ).not.toBeDisabled();
            });
          });
        });
      });

      test.describe("No fiscal profile", () => {
        test.beforeEach(async () => {
          await walletPage.noFiscalType();
          await walletPage.grossPendingBooty();
          await walletPage.visit();
        });

        test.describe("Payment request button", () => {
          test(`The button to request payments is disabled`, async ({
            page,
          }) => {
            await expect(
              page.getByTestId("request-payment-cta")
            ).toBeDisabled();
          });
        });
      });
    });
  });
});
