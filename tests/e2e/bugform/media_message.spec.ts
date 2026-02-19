import { expect, test } from "../../fixtures/I18n";
import { BugFormPage } from "../../fixtures/BugFormPage";

test.describe("BugForm media upload message", () => {
  let bugFormPage: BugFormPage;

  test.beforeEach(async ({ page }) => {
    bugFormPage = new BugFormPage(page);
    await bugFormPage.loggedIn();
    await bugFormPage.noPopups();
  });

  test("should show video and image required message when autoApprove=1 and minimumMedia > 1", async ({
    page,
  }) => {
    await bugFormPage.withCampaign(
      "tests/api/users/me/campaigns/campaignId/_get/200_auto-approve-minimumMedia-gt1.json"
    );
    await bugFormPage.visit();

    await expect(
      page.getByText(/including one video and one image/i)
    ).toBeVisible();
  });

  test("should show standard message when autoApprove=1 and minimumMedia = 1", async ({
    page,
  }) => {
    await bugFormPage.withCampaign(
      "tests/api/users/me/campaigns/campaignId/_get/200_auto-approve-minimumMedia-eq1.json"
    );
    await bugFormPage.visit();

    await expect(page.getByText(/Upload at least \d+ media/i)).toBeVisible();
    await expect(
      page.getByText(/including one video and one image/i)
    ).not.toBeVisible();
  });

  test("should show standard message when autoApprove=0 and minimumMedia > 1", async ({
    page,
  }) => {
    await bugFormPage.withCampaign(
      "tests/api/users/me/campaigns/campaignId/_get/200_full.json"
    );
    await bugFormPage.visit();

    await expect(page.getByText(/Upload at least \d+ media/i)).toBeVisible();
    await expect(
      page.getByText(/including one video and one image/i)
    ).not.toBeVisible();
  });
});

test.describe("BugForm media validation for autoApprove campaigns", () => {
  let bugFormPage: BugFormPage;

  test.beforeEach(async ({ page }) => {
    bugFormPage = new BugFormPage(page);
    await bugFormPage.loggedIn();
    await bugFormPage.noPopups();
    await bugFormPage.withCampaign(
      "tests/api/users/me/campaigns/campaignId/_get/200_auto-approve-minimumMedia-gt1.json"
    );
    await bugFormPage.mockMediaUpload();
    await bugFormPage.visit();
  });

  test("should show error when only images are uploaded", async ({ page }) => {
    await bugFormPage.uploadFiles([
      { name: "image1.jpg", mimeType: "image/jpeg" },
      { name: "image2.jpg", mimeType: "image/jpeg" },
      { name: "image3.jpg", mimeType: "image/jpeg" },
    ]);
    await page.getByText("Submit this bug report").first().click();
    await expect(
      page.getByText(/At least one video is required/i)
    ).toBeVisible();
    await expect(
      page.getByText(/At least one image is required/i)
    ).not.toBeVisible();
  });

  test("should show error when only videos are uploaded", async ({ page }) => {
    await bugFormPage.uploadFiles([
      { name: "video1.mp4", mimeType: "video/mp4" },
      { name: "video2.mp4", mimeType: "video/mp4" },
      { name: "video3.mp4", mimeType: "video/mp4" },
    ]);
    await page.getByText("Submit this bug report").first().click();
    await expect(
      page.getByText(/At least one image is required/i)
    ).toBeVisible();
    await expect(
      page.getByText(/At least one video is required/i)
    ).not.toBeVisible();
  });

  test("should not show video/image errors when both types are uploaded", async ({
    page,
  }) => {
    await bugFormPage.uploadFiles([
      { name: "video1.mp4", mimeType: "video/mp4" },
      { name: "image1.jpg", mimeType: "image/jpeg" },
      { name: "image2.jpg", mimeType: "image/jpeg" },
    ]);
    await page.getByText("Submit this bug report").first().click();
    await expect(
      page.getByText(/At least one video is required/i)
    ).not.toBeVisible();
    await expect(
      page.getByText(/At least one image is required/i)
    ).not.toBeVisible();
  });
});
