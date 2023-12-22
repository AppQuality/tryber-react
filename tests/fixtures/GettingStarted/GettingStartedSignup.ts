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
      passwordRequirements: () =>
        this.page.getByTestId("password-requirements"),
      nextButton: () =>
        this.page.getByRole("button", {
          name: this.i18n.t("SIGNUP_STEP:::continue"),
        }),
      secondStepContainer: () =>
        this.page.getByTestId("mail-signup-second-step"),
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
    await this.mockMailDoesNotExist({ email: "test@example.com" });
    await this.fillEmailWith("test@example.com");
    await this.fillPasswordWith("Password1!");
  }

  async fillEmailAndPasswordWithExistingEmail() {
    await this.mockMailExist({ email: "test@example.com" });
    await this.fillEmailWith("test@example.com");
    await this.fillPasswordWith("Password1!");
  }

  async goToSecondStep() {
    await this.fillEmailAndPasswordWithValidData();
    await this.elements().nextButton().click();
  }

  async mockMailExist({ email }: { email: string }) {
    await this.page.route(`*/**/api/users/by-email/${email}`, async (route) => {
      await route.fulfill({
        body: "{}",
        status: 200,
      });
    });
  }
  async mockMailDoesNotExist({ email }: { email: string }) {
    await this.page.route(`*/**/api/users/by-email/${email}`, async (route) => {
      await route.fulfill({
        body: "{}",
        status: 404,
      });
    });
  }
}
