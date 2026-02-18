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
