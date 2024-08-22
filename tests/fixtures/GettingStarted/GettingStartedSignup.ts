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
      nameInput: () => this.page.getByTestId("input-name"),
      surnameInput: () => this.page.getByTestId("input-surname"),
      confirmationStep: () => this.page.getByTestId("signup-success"),
      birthdateInput: () =>
        this.page.getByLabel(this.i18n.t("DATE_OF_BIRTH:::SignupFrom Step1")),
      countryInput: () => this.page.getByTestId("select-country"),
      mailCheckbox: () =>
        this.page.getByLabel(
          this.i18n.t(
            "SIGNUP_FORM:::I agree to receive earning opportunity emails from AppQuality"
          )
        ),
      termsLink: () => this.page.getByTestId("terms-and-conditions"),
      privacyLink: () => this.page.getByTestId("privacy-policy"),
      ethicalLink: () => this.page.getByTestId("ethical-code"),
      passwordRequirements: () =>
        this.page.getByTestId("password-requirements"),
      nextButton: () =>
        this.page.getByRole("button", {
          name: this.i18n.t("SIGNUP_STEP:::continue"),
        }),
      backButton: () =>
        this.page.getByRole("button", {
          name: this.i18n.t("SIGNUP_STEP:::back"),
        }),
      submitButton: () =>
        this.page.getByRole("button", {
          name: this.i18n.t("SIGNUP_STEP:::submit"),
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

  async fillSecondStepWithValidData() {
    await this.fillNameWith("Test");
    await this.fillSurnameWith("User");
    await this.fillBirthdateWith("1990-01-01");
    await this.fillCountryWith("Italy");
    await this.elements().mailCheckbox().click();
  }

  async fillNameWith(name: string) {
    const nameInput = this.elements().nameInput();
    await nameInput.fill(name);
  }

  async fillSurnameWith(surname: string) {
    const surnameInput = this.elements().surnameInput();
    await surnameInput.fill(surname);
  }

  async fillBirthdateWith(birthdate: string) {
    const birthdateInput = this.elements().birthdateInput();
    await birthdateInput.fill(birthdate);
  }

  async fillCountryWith(country: string) {
    const countryInput = this.elements().countryInput();
    await countryInput.click();
    await countryInput.getByText(country).click();
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
