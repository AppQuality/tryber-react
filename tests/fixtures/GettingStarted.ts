import { type Page } from "@playwright/test";
import { TryberPage } from "./TryberPage";

export class GettingStarted extends TryberPage {
  readonly page: Page;
  readonly mainUrl = "/getting-started";
  readonly signupUrl = "/getting-started/signup";
  readonly confirmationUrl = "/getting-started/confirmation";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visitSignupChoicePage() {
    await this.page.goto(this.mainUrl);
  }
  async visitMailSignupPage() {
    await this.page.goto(this.signupUrl);
  }
  async visitConfirmationPage() {
    await this.page.goto(this.confirmationUrl);
  }
}
