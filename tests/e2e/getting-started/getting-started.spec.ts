import { DashboardPage } from "../../fixtures/DashboardPage";
import {
  GettingStarted,
  gettingStartedUrl,
  signupUrl,
} from "../../fixtures/GettingStarted";
import { expect, test } from "../../fixtures/I18n";

let gettingStarted: GettingStarted;
let dashboard: DashboardPage;

test.describe("if the user is logged in", () => {
  test.beforeEach(async ({ page, i18n }) => {
    gettingStarted = new GettingStarted({ page, i18n });
    gettingStarted.loggedIn();
    dashboard = new DashboardPage(page);
  });
  test(`the url ${gettingStartedUrl} should redirect to the dashboard`, async ({
    page,
  }) => {
    await gettingStarted.visitSignupChoicePage();
    await expect(page).toHaveURL(new RegExp(`${dashboard.url}/$`));
  });
});

test.describe("if the user is logged out", () => {
  test(`${gettingStartedUrl} should display the getting started page`, async ({
    page,
  }) => {});
});

test.describe("The getting started page", () => {
  test.beforeEach(async ({ page, i18n }) => {
    gettingStarted = new GettingStarted({ page, i18n });
    await gettingStarted.loggedOut();
    await gettingStarted.visitSignupChoicePage();
  });
  test(`should display a title`, async ({ page, i18n }) => {
    await expect(
      page.getByRole("heading", { name: i18n.t("Signup for Tryber") })
    ).toBeVisible();
  });
  test(`should display a navigation to change language`, async ({ page }) => {
    await expect(page.getByTestId("language-switcher")).toBeVisible();

    const languageSwitcher = page.getByTestId("language-switcher");
    await expect(
      languageSwitcher.getByTestId("language-switcher-it")
    ).toContainText("Italiano");
    await expect(
      languageSwitcher.getByTestId("language-switcher-it")
    ).toHaveAttribute("href", "/it/getting-started/");
    await expect(
      languageSwitcher.getByTestId("language-switcher-en")
    ).toContainText("English");
    await expect(
      languageSwitcher.getByTestId("language-switcher-en")
    ).toHaveAttribute("href", "/getting-started/");
    await expect(
      languageSwitcher.getByTestId("language-switcher-es")
    ).toContainText("Español");
    await expect(
      languageSwitcher.getByTestId("language-switcher-es")
    ).toHaveAttribute("href", "/es/getting-started/");

    await expect(
      languageSwitcher.getByTestId("language-switcher-en")
    ).toHaveClass(/current/);
  });
  test(`should display a button to signup with facebook`, async ({
    page,
    i18n,
  }) => {
    await expect(page.getByTestId("facebook-signup")).toBeVisible();
    await expect(page.getByTestId("facebook-signup")).toHaveText(
      i18n.t("Continue with Facebook")
    );
  });
  test(`if the user click to facebook login is redirected to facebook login page`, async ({
    page,
  }) => {
    const facebookSignup = page.getByTestId("facebook-signup");
    await facebookSignup.click();
    expect(page.url()).toContain("admin-ajax.php");
    expect(page.url()).toContain("action=facebook_oauth_redirect");
  });
  test(`should display a button to signup with linkedin`, async ({
    page,
    i18n,
  }) => {
    await expect(page.getByTestId("linkedin-signup")).toBeVisible();
    await expect(page.getByTestId("linkedin-signup")).toHaveText(
      i18n.t("Continue with LinkedIn")
    );
  });
  test(`if the user click to linkedin login is redirected to linkedin login page`, async ({
    page,
  }) => {
    const linkedinSignup = page.getByTestId("linkedin-signup");
    await linkedinSignup.click();
    expect(page.url()).toContain("admin-ajax.php");
    expect(page.url()).toContain("action=linkedin_oauth_redirect");
  });
  test(`should display a link to the terms and conditions`, async ({
    page,
    i18n,
  }) => {
    await expect(page.getByTestId("terms-and-conditions")).toBeVisible();
    await expect(page.getByTestId("terms-and-conditions")).toHaveText(
      i18n.t("Terms")
    );
  });
  test(`if the user click the terms and conditions link another tab is opened to /terms-and-conditions in the current language`, async ({
    page,
    i18n,
    context,
  }) => {
    const pagePromise = context.waitForEvent("page");
    const termsAndConditions = page.getByTestId("terms-and-conditions");
    await expect(termsAndConditions).toHaveAttribute("target", "_blank");
    await termsAndConditions.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(i18n.t("/terms-and-conditions/"));
  });
  test(`should display a link privacy policy`, async ({ page, i18n }) => {
    await expect(page.getByTestId("privacy-policy")).toBeVisible();
    await expect(page.getByTestId("privacy-policy")).toHaveText(
      i18n.t("Privacy Policy")
    );
  });
  test(`if the user click the privacy policy link another tab is opened to https://www.iubenda.com/privacy-policy/7934311`, async ({
    page,
    i18n,
    context,
  }) => {
    const pagePromise = context.waitForEvent("page");
    const privacyPolicy = page.getByTestId("privacy-policy");
    await expect(privacyPolicy).toHaveAttribute("target", "_blank");
    await privacyPolicy.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(
      i18n.t("https://www.iubenda.com/privacy-policy/7934311")
    );
  });
  test(`should display a link to ethical code`, async ({ page, i18n }) => {
    await expect(page.getByTestId("ethical-code")).toBeVisible();
    await expect(page.getByTestId("ethical-code")).toHaveText(
      i18n.t("Ethical Code")
    );
  });
  test(`if the user click the ethical code link another tab is opened to /ethical-code in the current language`, async ({
    page,
    i18n,
    context,
  }) => {
    const pagePromise = context.waitForEvent("page");
    const ethicalCode = page.getByTestId("ethical-code");
    await expect(ethicalCode).toHaveAttribute("target", "_blank");
    await ethicalCode.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(i18n.t("/ethical-code/"));
  });
  test(`should display a link to the login page`, async ({ page, i18n }) => {
    await expect(page.getByTestId("login")).toBeVisible();
    await expect(page.getByTestId("login")).toHaveText("Login");
  });
  test(`if the user click the login link navigato to /login in the current language`, async ({
    page,
  }) => {
    const login = page.getByTestId("login");
    await login.click();
    expect(page.url()).toContain("/login");
  });
  test(`should display a button to signup with mail`, async ({
    page,
    i18n,
  }) => {
    await expect(page.getByTestId("email-signup")).toBeVisible();
    await expect(page.getByTestId("email-signup")).toHaveText(
      i18n.t("Continue with email")
    );
  });
  test(`if the user click the signup with mail button navigate to ${signupUrl} in the current language`, async ({
    page,
  }) => {
    const emailSignup = page.getByTestId("email-signup");
    await emailSignup.click();
    expect(page.url()).toContain(signupUrl);
  });
});
