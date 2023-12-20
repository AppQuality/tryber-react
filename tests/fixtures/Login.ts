import { type Page } from "@playwright/test";
import { TryberPage } from "./TryberPage";

export class Login extends TryberPage {
  readonly page: Page;
  readonly url = "/login";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async visitLoginPage() {
    await this.page.goto("/login");
  }
}
