import { type Page } from "@playwright/test";
import { TryberPage } from "./TryberPage";

export class GettingStarted extends TryberPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visitSignupChoicePage() {
    await this.page.goto("/getting-started");
  }
  async visitMailSignupPage() {
    await this.page.goto("/getting-started/mail-signup");
  }
  async visitConfirmationPage() {
    await this.page.goto("/getting-started/confirmation");
  }
}
