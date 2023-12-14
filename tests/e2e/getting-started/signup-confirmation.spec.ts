import { test, expect } from "@playwright/test";
import { GettingStarted } from "../../fixtures/GettingStarted";
import { DashboardPage } from "../../fixtures/DashboardPage";

let gettingStarted: GettingStarted;
let dashboard: DashboardPage;

test.describe("The confirmation page", () => {
  test("should display a navigation to change language", async ({}) => {});
  test("should display a success text", async ({}) => {});
  test(`should display a button to go to ${dashboard.url} in the current language`, async ({}) => {});
});
