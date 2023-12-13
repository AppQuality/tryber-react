/* eslint-disable jest/no-identical-title */
import { test, expect } from "../../../fixtures/I18n";
import { WalletPage } from "../../../fixtures/WalletPage";

//For Users with profile type witholding > 5K, VAT, Company and internal
test.describe("Payment request for user without a valid fiscal profile: ", () => {
  let walletPage: WalletPage;
  test.beforeEach(async ({ page }) => {
    walletPage = new WalletPage(page);
    await walletPage.loggedIn();
    await walletPage.noFiscalType();
    await walletPage.grossPendingBooty();
    await walletPage.visit();
  });
  test(`The button to request payments is disabled`, async ({ page }) => {
    await expect(page.getByTestId("request-payment-cta")).toBeDisabled();
  });
});
