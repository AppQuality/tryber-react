import { type Page } from "@playwright/test";
import { TryberPage } from "./TryberPage";

export class Login extends TryberPage {
  readonly page: Page;
  readonly url = "/login";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visitLoginPage(locale: "en" | "it" | "es" | undefined = undefined) {
    await this.page.goto(`${locale ? "/" + locale : ""}/login`);
  }

  async getTitle() {
    return await this.page.textContent("h1");
  }

  elements() {
    return {
      emailInput: () => this.page.getByLabel("email"),
      passwordInput: () => this.page.getByLabel("password"),
    };
  }

  async fillEmailAndPasswordWithValidData() {
    await this.fillEmailWith("test@example.com");
    await this.fillPasswordWith("Password1!");
  }

  async fillEmailWith(email: string) {
    const mailInput = this.elements().emailInput();
    await mailInput.fill(email);
  }

  async fillPasswordWith(password: string) {
    const mailInput = this.elements().passwordInput();
    await mailInput.fill(password);
  }
}
