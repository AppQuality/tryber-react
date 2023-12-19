import { type Page } from "@playwright/test";
import { TryberPage } from "./TryberPage";

export const gettingStartedUrl = "/getting-started";
export const signupUrl = "/getting-started/signup";
export const confirmationUrl = "/getting-started/confirmation";
export class GettingStarted extends TryberPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visitSignupChoicePage() {
    await this.page.goto(gettingStartedUrl);
  }
  async visitMailSignupPage() {
    await this.page.goto(signupUrl);
  }
  async visitConfirmationPage() {
    await this.page.goto(confirmationUrl);
  }
}
