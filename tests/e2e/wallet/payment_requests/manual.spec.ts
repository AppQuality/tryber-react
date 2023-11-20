/* eslint-disable jest/no-identical-title */
import { test, expect } from "../../../fixtures/I18n";
import { WalletPage } from "../../../fixtures/WalletPage";

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

        test("should contain fiscal profile name", async ({ page, i18n }) => {
          await expect(
            page.getByTestId("manual-payment-fiscal-profile-recap")
          ).toContainText(i18n.t(fiscalType.translationKey));
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
          i18n,
        }) => {
          await page.getByTestId("payment-modal-next").click();

          await page.locator("input#bankaccountOwner").fill("ciccio paguro");
          await page.locator("input#iban").fill("wrong iban");
          await page.locator("#termsAcceptance").check();
          await page.getByTestId("payment-modal-next").click();
          await expect(
            page.getByTestId("manual-payment-modal-iban")
          ).toContainText(i18n.t("This is an invalid format."));
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
          i18n,
        }) => {
          await page.locator("input#bankaccountOwner").fill("ciccio paguro");
          await page.locator("input#iban").fill("IT60X0542811101000000123456");

          await page.getByTestId("payment-modal-next").click();
          await expect(
            page.getByTestId("manual-payment-modal-terms")
          ).toContainText(i18n.t("you must accept terms and conditions"));
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
        });

        test.describe("during the api call", () => {
          test.beforeEach(async ({ page }) => {
            await walletPage.postUsersMePayments({ delay: 4000 });
          });
          test("in the third step if the process payment is pressed, while the api call is being executed, the process payment button and back button are disabled and there is a loading text", async ({
            page,
            i18n,
          }) => {
            await page.getByTestId("payment-modal-next").click();
            await expect(page.getByTestId("payment-modal-next")).toBeDisabled();
            await expect(page.getByTestId("payment-modal-back")).toBeDisabled();
            await expect(page.getByTestId("payment-modal-next")).toContainText(
              i18n.t("...wait")
            );
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
                path: "tests/api/users/me/payments/_get/200_paid-and-processing.json",
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
                path: "tests/api/users/me/payments/_get/200_paid-and-processing.json",
              });
            });
            await walletPage.emptyGrossPendingBooty();
            await page.getByTestId("payment-modal-next").click();
            await expect(
              page.getByTestId("manual-payment-modal-step-4")
            ).toBeVisible();
            await page
              .getByTestId("payment-modal")
              .locator(".modal-close")
              .click();

            const walletManagement = page.getByTestId("wallet-management");

            await expect(walletManagement.getByTestId("net-booty")).toHaveCount(
              0
            );
            await expect(
              walletManagement.getByTestId("gross-booty")
            ).toBeVisible();
            await expect(
              walletManagement.getByTestId("gross-booty")
            ).toContainText("0.00");
            await expect(
              walletManagement.getByTestId("wallet-pending-booty")
            ).toHaveClass(/aq-text-disabled-dark/);
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
        let count = 0;
        test.beforeEach(async ({ page }) => {
          await walletPage.postUsersMePayments();
          await walletPage.requestPayment();
          await expect(page.getByTestId("payment-modal-next")).toBeVisible();
          await page.getByTestId("payment-modal-next").click();
          await page.locator("input#bankaccountOwner").fill("ciccio paguro");
          await page.locator("input#iban").fill("IT60X0542811101000000123456");
          await page.locator("#termsAcceptance").check();
          await page.getByTestId("payment-modal-next").click();
          page.on("request", (request) => {
            if (
              request.url().includes("/users/me/payments") &&
              request.method() === "GET"
            ) {
              count++;
            }
          });
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
          await expect(
            page.getByTestId("manual-payment-modal-step-4")
          ).toBeVisible();
          expect(count).toBe(2);
        });
      });
    });
  });
});
