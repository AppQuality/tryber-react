import { type Page } from "@playwright/test";
import { TryberPage } from "./TryberPage";

export const gettingStartedUrl = "/getting-started";
export const signupUrl = "/getting-started/signup";
export const confirmationUrl = "/getting-started/confirmation";
export class GettingStarted extends TryberPage {
  readonly page: Page;

  readonly selectors = {
    byTestId: {
      emailInput: "email-input",
      passwordInput: "password-input",
    },
  };

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

  elements = {
    emailInput: () => this.page.getByTestId(this.selectors.byTestId.emailInput),
    passwordInput: () =>
      this.page.getByTestId(this.selectors.byTestId.passwordInput),
  };

  async fillEmailWith(email: string) {
    const mailInput = this.elements.emailInput();
    await mailInput.fill(email);
  }
  async fillPasswordWith(password: string) {
    const mailInput = this.elements.passwordInput();
    await mailInput.fill(password);
  }

  async fillEmailAndPasswordWithValidData() {
    await this.fillEmailWith("test@example.com");
    await this.fillPasswordWith("Password1!");
  }
}
