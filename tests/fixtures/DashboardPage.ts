import { type Page } from "@playwright/test";
import { TryberPage } from "./TryberPage";

export class DashboardPage extends TryberPage {
  readonly page: Page;
  readonly url = "/my-dashboard";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visit() {
    await this.page.goto(this.url);
  }

  async stayGold() {
    await this.page.route("*/**/api/users/me/rank", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/rank/_get/200_stay-gold.json",
      });
    });
  }

  async noPopups() {
    await this.page.route("*/**/api/users/me/popups", async (route) => {
      await route.fulfill({ path: "tests/api/popups/_get/404_not-found.json" });
    });
  }

  async dashboardFieldsGrossOnly() {
    await this.page.route(
      "*/**/api/users/me?fields=total_exp_pts%2Cbooty%2Cpending_booty%2Crank%2Cattended_cp%2Capproved_bugs",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_dashboard_fields_gross_only.json",
        });
      }
    );
  }

  async dashboardFieldsNet() {
    await this.page.route(
      "*/**/api/users/me?fields=total_exp_pts%2Cbooty%2Cpending_booty%2Crank%2Cattended_cp%2Capproved_bugs",
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/_get/200_dashboard_fields_net.json",
        });
      }
    );
  }
}
