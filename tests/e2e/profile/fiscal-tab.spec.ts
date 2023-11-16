import { test, expect, type Page } from "@playwright/test";
import { ProfilePage } from "../../fixtures/ProfilePage";
test.describe("tab fiscal profile", () => {
  let profilePage: ProfilePage;
  test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page);

    await profilePage.loggedIn();
    await profilePage.profileUsersMeCustomUserFields();
    await profilePage.profileUsersMeFields();
    await profilePage.profileUsersMeFiscal();
    await profilePage.profileUsersMeLanguages();
    await profilePage.profileUsersMeEducation();
    await profilePage.visitFiscalTab();
  });
  test("If Api layer answer with an internal fiscal profile, edit Button is disabled", async ({
    page,
  }) => {
    await expect(page.getByTestId("edit-fiscal-data-cta")).toBeDisabled();
  });
});
