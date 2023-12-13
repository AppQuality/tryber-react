import { type Page } from "@playwright/test";
import { TryberPage } from "./TryberPage";

export class ProfilePage extends TryberPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visitBaseTab() {
    await this.page.goto("/my-account/?tab=base");
  }

  async visitFiscalTab() {
    await this.page.goto("/my-account/?tab=fiscal");
  }

  async profileUsersMeFields() {
    await this.page.route("*/**/api/users/me?fields=all", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/_get/200_Example_1.json",
      });
    });
  }

  async profileUsersMeFiscal() {
    await this.page.route("*/**/api/users/me/fiscal", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/fiscal/_get/200_internal.json",
      });
    });
  }

  async profileUsersMeLanguages() {
    await this.page.route("*/**/api/users/me/languages", async (route) => {
      await route.fulfill({
        path: "tests/api/users/me/languages/_get/200_Example_1.json",
      });
    });
  }

  async profileUsersMeCustomUserFields() {
    await this.page.route("*/**/api/custom_user_fields", async (route) => {
      await route.fulfill({
        path: "tests/api/custom_user_fields/_get/200_Example-1.json",
      });
    });
  }

  async profileUsersMeEducation() {
    await this.page.route("*/**/api/education", async (route) => {
      await route.fulfill({
        path: "tests/api/education/_get/200_Example-1.json",
      });
    });
  }

  async profileUsersMeEmployments() {
    await this.page.route("*/**/api/employments", async (route) => {
      await route.fulfill({
        path: "tests/api/employments/_get/200_Example-1.json",
      });
    });
  }

  async profileUsersMeLanguagesPut() {
    await this.page.route("*/**/api/languages", async (route) => {
      await route.fulfill({
        path: "tests/api/languages/_get/200_All-languages.json",
      });
    });
  }
}
