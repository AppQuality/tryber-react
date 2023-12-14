import { test, expect } from "@playwright/test";
import { GettingStarted } from "../../fixtures/GettingStarted";
import { DashboardPage } from "../../fixtures/DashboardPage";

let gettingStarted: GettingStarted;
let dashboard: DashboardPage;

test.describe("if the user is logged in", () => {
  test(`the url /getting-started should redirect to the dashboard`, async ({
    page,
  }) => {
    gettingStarted = new GettingStarted(page);
    await gettingStarted.visitSignupChoicePage();
    expect(page.url()).toContain(dashboard.url);
  });
  test(`the url ${gettingStarted.signupUrl} should redirect to the dashboard`, async ({
    page,
  }) => {});
  test(`the url ${gettingStarted.confirmationUrl} should redirect to the dashboard`, async ({
    page,
  }) => {});
});

test.describe("if the user is logged out", () => {
  test(`${gettingStarted.mainUrl} should display the signup choice page`, async ({
    page,
  }) => {});
  test(`${gettingStarted.signupUrl} should redirect to ${gettingStarted.mainUrl}`, async ({
    page,
  }) => {});
  test(`${gettingStarted.confirmationUrl} should redirect to ${gettingStarted.mainUrl} if the user doesn't come from a succesfull signup`, async ({
    page,
  }) => {});
  test(`${gettingStarted.confirmationUrl} should display a confirmation message if the user succesfully signed up`, async ({
    page,
  }) => {
    // can't develop this test because the signup process is not implemented yet
  });
});

test.describe("The signup choice page", () => {
  test(`should display a navigation to change language`, async ({}) => {});
  test(`should display in bold the current language`, async ({}) => {});
  test(`if the user click on a language link should change language`, async ({}) => {});
  test(`should display a button to signup with facebook`, async ({}) => {});
  test(`if the user click to facebook login is redirected to facebook login page`, async ({}) => {});
  test(`should display a button to signup with linkedin`, async ({}) => {});
  test(`if the user click to linkedin login is redirected to linkedin login page`, async ({}) => {});
  test(`should display a link to the terms and conditions`, async ({}) => {});
  test(`if the user click the terms and conditions link another tab is opened to /terms-and-conditions in the current language`, async ({}) => {});
  test(`should display a link privacy policy`, async ({}) => {});
  test(`if the user click the privacy policy link another tab is opened to https://www.iubenda.com/privacy-policy/7934311`, async ({}) => {});
  test(`should display a link to ethical code`, async ({}) => {});
  test(`if the user click the ethical code link another tab is opened to /ethical-code in the current language`, async ({}) => {});
  test(`should display a link to the login page`, async ({}) => {});
  test(`if the user click the login link navigato to /login in the current language`, async ({}) => {});
  test(`should display a button to signup with mail`, async ({}) => {});
  test(`if the user click the signup with mail button navigate to ${gettingStarted.signupUrl} in the current language`, async ({}) => {});
});
