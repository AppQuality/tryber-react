import { test, expect } from "@playwright/test";
import { WalletPage } from "../../fixtures/WalletPage";
import getCurrencySymbol from "../../../src/utils/getCurrencySymbol";

test.describe("Manage your payment card:", () => {
  let walletPage: WalletPage;
  test.beforeEach(async ({ page }) => {
    walletPage = new WalletPage(page);
    await walletPage.loggedIn();
    await walletPage.nonItalianFiscalType();
    await walletPage.tablePaymentsAllPaid();
  });
  test.describe("If api response have net value", () => {
    test.beforeEach(async ({ page }) => {
      await walletPage.netPendingBooty();
      await walletPage.visit();
    });
    test("payment request card should display both net and gross values", async ({
      page,
    }) => {
      const {
        pending_booty,
      } = require("../../api/users/me/_get/200_booty_net.json");
      const walletManagement = page.getByTestId("wallet-management");

      await expect(walletManagement.getByTestId("net-booty")).toContainText(
        `${pending_booty.net.value.toFixed(2)}${getCurrencySymbol(
          pending_booty.net.currency
        )}`
      );
      await expect(walletManagement.getByTestId("gross-booty")).toContainText(
        `${pending_booty.gross.value.toFixed(2)}${getCurrencySymbol(
          pending_booty.gross.currency
        )}`
      );
    });
    test("payment request button should open a modal with both net and gross values", async ({
      page,
    }) => {
      const {
        pending_booty,
      } = require("../../api/users/me/_get/200_booty_net.json");
      walletPage.requestPayment();

      const modal = page.locator(".modal");
      await modal.locator("#paymentMethod-pp").click();
      await page.getByTestId("payment-modal-next").click();
      await modal.locator("#ppAccountOwner").fill("e@mail.com");
      await modal.locator("#confirmEmail").fill("e@mail.com");
      await modal.locator("#termsAcceptance").click();
      await modal.getByTestId("payment-modal-next").click();

      await expect(modal.getByTestId("payment-modal-net-booty")).toContainText(
        `${getCurrencySymbol(
          pending_booty.net.currency
        )}${pending_booty.net.value.toFixed(2)}`
      );
      await expect(
        modal.getByTestId("payment-modal-gross-booty")
      ).toContainText(
        `${getCurrencySymbol(
          pending_booty.gross.currency
        )}${pending_booty.gross.value.toFixed(2)}`
      );
    });
  });

  test.describe("If api response does not have net value", () => {
    test.beforeEach(async ({ page }) => {
      await walletPage.grossPendingBooty();
      await walletPage.visit();
    });
    test("payment request card should display only gross values", async ({
      page,
    }) => {
      const {
        pending_booty,
      } = require("../../api/users/me/_get/200_booty_gross.json");
      const walletManagement = page.getByTestId("wallet-management");
      await expect(walletManagement.getByTestId("net-booty")).toHaveCount(0);
      await expect(walletManagement.getByTestId("gross-booty")).toContainText(
        `${pending_booty.gross.value.toFixed(2)}${getCurrencySymbol(
          pending_booty.gross.currency
        )}`
      );
    });
    test("payment request button should open a modal showing only gross value", async ({
      page,
    }) => {
      const {
        pending_booty,
      } = require("../../api/users/me/_get/200_booty_gross.json");
      walletPage.requestPayment();
      const modal = await page.locator(".modal");
      await modal.locator("#paymentMethod-pp").click();
      await page.getByTestId("payment-modal-next").click();
      await modal.locator("#ppAccountOwner").fill("e@mail.com");

      await modal.locator("#confirmEmail").fill("e@mail.com");
      await modal.locator("#termsAcceptance").click();
      await modal.getByTestId("payment-modal-next").click();
      await expect(page.getByTestId("payment-modal-net-booty")).toHaveCount(0);
      await expect(page.getByTestId("payment-modal-gross-booty")).toContainText(
        `${getCurrencySymbol(
          pending_booty.gross.currency
        )}${pending_booty.gross.value.toFixed(2)}`
      );
    });
  });

  test.describe("Booty details table", () => {
    test.beforeEach(async ({ page }) => {
      await walletPage.netPendingBooty();
      await walletPage.bootyDetails();
      await walletPage.visit();
    });
    test("should only show tot gross and not net amount", async ({ page }) => {
      walletPage.openBootyDetails();
      await page.waitForSelector(".modal");
      const modal = page.locator(".modal");
      await expect(modal.locator(".thead")).toContainText([
        /^Activity name$/,
        /^Activity$/,
        /^Awarded on$/,
        /^Tot. gross$/,
      ]);
    });
  });
});
