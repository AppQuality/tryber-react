import { test, expect } from "@playwright/test";
import {
  GettingStarted,
  gettingStartedUrl,
} from "../../fixtures/GettingStarted";
import { dashboardUrl } from "../../fixtures/DashboardPage";

let gettingStarted: GettingStarted;

test.describe("The confirmation page", () => {
  test(`if the user is loggedin should display the page`, async ({
    page,
  }) => {});
  test(` if the user is logged out should redirect to ${gettingStartedUrl}`, async ({
    page,
  }) => {});
  test("should display a logged in header", async ({}) => {});
  test("should display a navigation to change language", async ({}) => {});
  test("should display a success text", async ({}) => {});
  test(`should display a button to go to ${dashboardUrl} in the current language`, async ({}) => {});
});
