import { type Page } from "@playwright/test";
import { GettingStarted } from ".";

export const gettingStartedUrl = "/getting-started";
export const signupUrl = "/getting-started/signup";
export const confirmationUrl = "/getting-started/confirmation";

export class GettingStartedSignup extends GettingStarted {
  readonly page: Page;
  readonly i18n: { t: (key: string) => string };
  static readonly url: string = "/getting-started/signup";

  async visit() {
    await this.page.goto(GettingStartedSignup.url);
  }
  async visitMailSignupPage() {
    await this.visit();
  }

  constructor({
    page,
    i18n,
  }: {
    page: Page;
    i18n: { t: (key: string) => string };
  }) {
    super({ page, i18n });
    this.page = page;
    this.i18n = i18n;
  }

  elements() {
    return {
      ...super.elements(),
      emailInput: () => this.page.getByTestId("email-input"),
      passwordInput: () => this.page.getByTestId("password-input"),
      nextButton: () =>
        this.page.getByRole("button", {
          name: this.i18n.t("SIGNUP_STEP:::continue"),
        }),
    };
  }

  async fillEmailWith(email: string) {
    const mailInput = this.elements().emailInput();
    await mailInput.fill(email);
  }
  async fillPasswordWith(password: string) {
    const mailInput = this.elements().passwordInput();
    await mailInput.fill(password);
  }

  async fillEmailAndPasswordWithValidData() {
    await this.fillEmailWith("test@example.com");
    await this.fillPasswordWith("Password1!");
  }

  async goToSecondStep() {
    await this.fillEmailAndPasswordWithValidData();
    await this.elements().nextButton().click();
  }
}
