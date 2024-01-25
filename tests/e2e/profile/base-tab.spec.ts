import { test, expect } from "@playwright/test";
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
    await profilePage.visitBaseTab();
  });
  test("la modifica dei campi base non trigghera l'aggiornamento del fiscal profile", async ({
    page,
  }) => {
    page.route("*/**/api/users/me", async (route) => {
      if (route.request().method() === "PATCH") {
        await route.fulfill({
          path: "tests/api/users/me/_patch/200_Example-1.json",
        });
      }
    });
    page.route("*/**/api/users/me/languages", async (route) => {
      if (route.request().method() === "PUT") {
        await route.fulfill({
          path: "tests/api/users/me/languages/_put/200_Example-1.json",
        });
      }
    });

    let requestToFiscal = false;
    page.on("request", (request) => {
      if (request.url().includes("//users/me/fiscal")) requestToFiscal = true;
    });

    await page.locator("#name").clear();
    await page.locator("#name").fill("string edited");
    await page.getByTestId("submit-base-info-cta").click({ force: true });
    expect(requestToFiscal).toBe(false);
    await expect(page.getByTestId("invalid-fiscal-profile")).toHaveCount(0);
  });
});
