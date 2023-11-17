import { test, expect } from "@playwright/test";
import { WalletPage } from "../../fixtures/WalletPage";
test.describe("Net and gross columns in wallet table", () => {
  const numberOfColumns = 7;
  let walletPage: WalletPage;
  test.beforeEach(async ({ page }) => {
    walletPage = new WalletPage(page);
    await walletPage.loggedIn();
    await walletPage.nonItalianFiscalType();
    await walletPage.netPendingBooty();
    await walletPage.tablePaymentsAllPaid();
    await walletPage.singlePaidPayment();
    await walletPage.singlePaidPayment1();
    await walletPage.visit();
  });

  test("Should show columns net and gross in wallet table", async ({
    page,
  }) => {
    const walletTable = page.locator(".wallet-table");
    await expect(walletTable.locator(".thead")).toHaveCount(numberOfColumns);
    await expect(walletTable.locator(".thead")).toContainText([
      /^ID$/,
      /^Status$/,
      /^Tot. gross$/,
      /^Net received$/,
      /^Paid on$/,
      /^Method$/,
      /^Actions$/,
    ]);
  });

  test("Should show net and gross values in wallet table", async ({ page }) => {
    const walletTable = page.locator(".wallet-table");
    const {
      results,
    } = require("../../api/users/me/payments/_get/200_multiple-pages.json");
    const allCells = walletTable.locator(".tbody.cell");

    for (const [index, cell] of (await allCells.all()).entries()) {
      await expect(cell).toContainText(
        index % numberOfColumns === 2
          ? results[index % numberOfColumns].amount.gross.value.toString()
          : results[index % numberOfColumns].amount.net.value.toString()
      );
    }
  });

  test("Should show a non empty table in the payment detail modal", async ({
    page,
  }) => {
    const walletTable = page.locator(".wallet-table");
    const allCells = walletTable.locator(".tbody.cell");
    for (const [index, cell] of (await allCells.all()).entries()) {
      if (index + 1 === numberOfColumns * 2) {
        await cell.locator(".action-details").click();
        await page.waitForSelector(".modal");
        const modal = page.locator(".modal");
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".thead")).toHaveCount(4);
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".thead")).toContainText("gross");
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".tbody")).toHaveCount(1);
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".tbody.cell")).toHaveCount(1);
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".tbody.cell")).not.toBeEmpty();
      }
    }
  });

  test("Should show empty state if no payments", async ({ page }) => {
    const walletTable = page.locator(".wallet-table");
    const allCells = walletTable.locator(".tbody.cell");
    for (const [index, cell] of (await allCells.all()).entries()) {
      if (index + 1 === numberOfColumns * 3) {
        await cell.locator(".action-details").click();
        await page.waitForSelector(".modal");
        const modal = page.locator(".modal");
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".thead")).toHaveCount(4);
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".thead")).toContainText([
          /^Activity name$/,
          /^Activity$/,
          /^Added on$/,
          /^Tot. gross$/,
        ]);
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".tbody")).toHaveCount(0);
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".tbody.cell")).toHaveCount(0);
        // eslint-disable-next-line jest/no-conditional-expect
        await expect(modal.locator(".tbody.cell")).toBeEmpty();
      }
    }
  });
});
