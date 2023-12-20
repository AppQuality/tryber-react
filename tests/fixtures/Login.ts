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
}
