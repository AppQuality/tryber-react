import { type Page } from "@playwright/test";
import { TryberPage } from "../TryberPage";

export const gettingStartedUrl = "/getting-started";
export const signupUrl = "/getting-started/signup";
export const confirmationUrl = "/getting-started/confirmation";
export class GettingStarted extends TryberPage {
  readonly page: Page;
  readonly i18n: { t: (key: string) => string };
  static readonly url: string = "/getting-started";

  readonly selectors = {
    byTestId: {
      emailInput: "email-input",
      passwordInput: "password-input",
    },
  };

  constructor({
    page,
    i18n,
  }: {
    page: Page;
    i18n: { t: (key: string) => string };
  }) {
    super(page);
    this.page = page;
    this.i18n = i18n;
  }

  async visit() {
    await this.page.goto(GettingStarted.url);
  }

  async visitSignupChoicePage() {
    await this.visit();
  }

  elements() {
    return {
      languageSwitcher: () => this.page.getByTestId("language-switcher"),
    };
  }
}
