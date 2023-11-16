import { type Page } from "@playwright/test";

export class TryberPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
