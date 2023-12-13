import { type Page } from "@playwright/test";
import { LoggedIn } from "./LoggedIn";

export class WalletPage extends LoggedIn {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visit() {
    await this.page.goto("/payments");
  }

  async noFiscalType() {
    await this.page.route("*/**/api/users/me/fiscal", async (route) => {
      await route.fulfill({
        status: 404,
        path: "tests/api/users/me/fiscal/_get/404_not-found.json",
      });
    });
  }

  async nonItalianFiscalType() {
    await this.page.route("*/**/api/users/me/fiscal", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/fiscal/_get/200_non-italian.json",
      });
    });
  }

  async vatFiscalType() {
    await this.page.route("*/**/api/users/me/fiscal", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/fiscal/_get/200_vat.json",
      });
    });
  }

  async companyFiscalType() {
    await this.page.route("*/**/api/users/me/fiscal", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/fiscal/_get/200_company.json",
      });
    });
  }

  async internalFiscalType() {
    await this.page.route("*/**/api/users/me/fiscal", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/fiscal/_get/200_internal.json",
      });
    });
  }

  async witholdingExtraFiscalType() {
    await this.page.route("*/**/api/users/me/fiscal", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/fiscal/_get/200_witholding-extra.json",
      });
    });
  }

  async witholdingFiscalType() {
    await this.page.route("*/**/api/users/me/fiscal", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/fiscal/_get/200_withholding.json",
      });
    });
  }

  async genericUserMePayments() {
    await this.page.route("*/**/api/users/me/payments*", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/payments/_get/200_single-paid-payment.json",
      });
    });
  }

  async tablePaymentsAllPaid() {
    await this.page.route(
      "*/**/api/users/me/payments?start=0&limit=10&orderBy=paidDate&order=DESC",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/payments/_get/200_multiple-pages-all-paid.json",
        });
      }
    );
  }

  async tablePaymentsPaidAndProcessing() {
    await this.page.route("*/**/api/users/me/payments*", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/payments/_get/200_paid-and-processing.json",
      });
    });
  }

  async netPendingBooty() {
    await this.page.route(
      "*/**/api/users/me?fields=pending_booty*",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_booty_net.json",
        });
      }
    );
  }

  async grossPendingBooty() {
    await this.page.route(
      "*/**/api/users/me?fields=pending_booty*",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_booty_gross.json",
        });
      }
    );
  }

  async getUsersMeBootyBirthdate() {
    await this.page.route(
      "*/**/api/users/me?fields=pending_booty%2CbirthDate",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_pendingbooty_birthdate.json",
        });
      }
    );
  }

  async bootyDetails() {
    await this.page.route(
      "*/**/api/users/me/pending_booty?order=DESC&orderBy=attributionDate&limit=10&start=0",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/pending_booty/_get/200_multiple-attributions.json",
        });
      }
    );
  }

  async singlePaidPayment() {
    await this.page.route(
      "*/**/api/users/me/payments/?order=DESC&orderBy=paidDate&limit=1&start=0",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/payments/_get/200_single-paid-payment.json",
        });
      }
    );
  }

  async singlePaidPayment1() {
    await this.page.route(
      "*/**/api/users/me/payments/1?order=DESC&orderBy=date&limit=10&start=0",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/payments/payment/_get/200_simple.json",
        });
      }
    );
  }

  async postUsersMePayments(options?: { delay?: number; fail?: number }) {
    await this.page.route("*/**/api/users/me/payments", async (route) => {
      if (route.request().method() === "POST") {
        if (options?.delay) await this.page.waitForTimeout(options.delay);
        if (options?.fail) {
          await route.fulfill({
            status: options.fail,
            path: "tests/api/users/me/payments/_post/200_Example_1.json",
          });
          return;
        }
        await route.fulfill({
          path: "tests/api/users/me/payments/_post/200_Example_1.json",
        });
      }
    });
  }

  async emptyGrossPendingBooty() {
    await this.page.route(
      "*/**/api/users/me?fields=pending_booty*",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_zero-booty-gross.json",
        });
      }
    );
  }

  async emptyNetPendingBooty() {
    await this.page.route(
      "*/**/api/users/me?fields=pending_booty*",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_zero-booty-net.json",
        });
      }
    );
  }

  async requestPayment() {
    const walletManagement = this.page.getByTestId("wallet-management");
    await walletManagement.getByTestId("request-payment-cta").click();
  }

  async openBootyDetails() {
    const walletManagement = this.page.getByTestId("wallet-management");
    await walletManagement.getByTestId("booty-details-cta").click();
  }
}
