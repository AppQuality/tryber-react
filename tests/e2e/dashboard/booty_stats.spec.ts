import { expect, test } from "@playwright/test";
import getCurrencySymbol from "../../../src/utils/getCurrencySymbol";
import { DashboardPage } from "../../fixtures/DashboardPage";

test.describe("The dashboard statistics card", () => {
  let dashboardPage: DashboardPage;
  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.loggedIn();
    await dashboardPage.stayGold();
    await dashboardPage.noPopups();
    await dashboardPage.visit();
  });
  test("should display both net and gross values if API response has net value", async ({
    page,
  }) => {
    await dashboardPage.dashboardFieldsNet();
    const {
      booty,
      pending_booty,
    } = require("../../api/users/me/_get/200_dashboard_fields_net.json");
    const receivedBooty = page.getByTestId("received-booty");
    const pendingBooty = page.getByTestId("pending-booty");

    await expect(receivedBooty.getByTestId("net-booty")).toContainText(
      `${getCurrencySymbol(booty.net.currency)}${booty.net.value}`
    );
    await expect(receivedBooty.getByTestId("gross-booty")).toContainText(
      `Gross ${getCurrencySymbol(booty.gross.currency)}${booty.gross.value}`
    );
    await expect(pendingBooty.getByTestId("net-booty")).toContainText(
      `${getCurrencySymbol(pending_booty.net.currency)}${
        pending_booty.net.value
      }`
    );
    await expect(pendingBooty.getByTestId("gross-booty")).toContainText(
      `Gross ${getCurrencySymbol(pending_booty.gross.currency)}${
        pending_booty.gross.value
      }`
    );
  });
  test("should display only gross value if API response does not have net value", async ({
    page,
  }) => {
    await dashboardPage.dashboardFieldsGrossOnly();
    const {
      booty,
      pending_booty,
    } = require("../../api/users/me/_get/200_dashboard_fields_gross_only.json");
    const receivedBooty = page.getByTestId("received-booty");
    const pendingBooty = page.getByTestId("pending-booty");

    await expect(receivedBooty.getByTestId("net-booty")).toHaveCount(0);
    await expect(receivedBooty.getByTestId("gross-booty")).toContainText(
      `Gross${getCurrencySymbol(booty.gross.currency)}${booty.gross.value}`
    );
    await expect(pendingBooty.getByTestId("net-booty")).toHaveCount(0);
    await expect(pendingBooty.getByTestId("gross-booty")).toContainText(
      `Gross${getCurrencySymbol(pending_booty.gross.currency)}${
        pending_booty.gross.value
      }`
    );
  });
});
