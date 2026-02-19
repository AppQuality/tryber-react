import { type Page } from "@playwright/test";
import { TryberPage } from "./TryberPage";

export class BugFormPage extends TryberPage {
  readonly page: Page;
  readonly campaignId = "123";

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async noPopups() {
    await this.page.route("*/**/api/users/me/popups", async (route) => {
      await route.fulfill({ path: "tests/api/popups/_get/404_not-found.json" });
    });
  }

  async withCampaign(fixture: string) {
    await this.page.route(
      `*/**/api/users/me/campaigns/${this.campaignId}`,
      async (route) => {
        await route.fulfill({ path: fixture });
      }
    );
    await this.page.route(
      `*/**/api/users/me/campaigns/${this.campaignId}/devices`,
      async (route) => {
        await route.fulfill({
          path: "tests/api/users/me/campaigns/campaignId/devices/_get/200_single-device.json",
        });
      }
    );
  }

  async visit() {
    await this.page.goto(`/campaign/${this.campaignId}/bugform`);
  }

  async mockMediaUpload() {
    await this.page.route(
      `*/**/api/users/me/campaigns/${this.campaignId}/media`,
      async (route) => {
        const body = route.request().postDataBuffer();
        const text = body?.toString("latin1") || "";
        const match = text.match(/filename="([^"]+)"/);
        const filename = match ? match[1] : "file.jpg";
        await route.fulfill({
          json: {
            files: [
              { name: filename, path: `https://example.com/${filename}` },
            ],
            failed: [],
          },
        });
      }
    );
  }

  async uploadFiles(files: { name: string; mimeType: string }[]) {
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(
      files.map((f) => ({
        name: f.name,
        mimeType: f.mimeType,
        buffer: Buffer.from([]),
      }))
    );
    await this.page
      .getByText(new RegExp(`${files.length}/${files.length} uploaded`))
      .waitFor();
  }
}
