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
    await this.page.getByText("Upload files").waitFor();

    await this.page.evaluate((filesData) => {
      const store = (window as any).__store;
      if (!store) throw new Error("Redux store not exposed on window.__store");
      const items = filesData.map(({ name, mimeType }, i) => ({
        id: `test_file_${i}_${name}`,
        fileName: name,
        fileType: mimeType.split("/")[0],
        mimeType,
        status: "success" as const,
        uploadedFileUrl: `https://example.com/${name}`,
        uploadId: `test_${i}`,
      }));
      store.dispatch({ type: "bugForm/appendMediaList", payload: items });
    }, files);

    await this.page
      .getByText(new RegExp(`${files.length}/${files.length} uploaded`))
      .waitFor();
  }
}
