import { test, expect } from "@playwright/test";
import { GettingStarted } from "../../fixtures/GettingStarted";

let gettingStarted: GettingStarted;

test.describe("if the user is logged in", () => {
  test("the url /getting-started should redirect to the dashboard", async ({
    page,
  }) => {});
  test("the url /getting-started/mail-signup should redirect to the dashboard", async ({
    page,
  }) => {});
  test("the url /getting-started/confirmation should redirect to the dashboard", async ({
    page,
  }) => {});
});

test.describe("if the user is logged out", () => {
  test("/getting-started should show the signup choice page", async ({
    page,
  }) => {});
  test("/getting-started/mail-signup should show the mail signup form", async ({
    page,
  }) => {});
  test("/getting-started/confirmation should redirect to /getting-started if the user doesn't come from a succesfull signup", async ({
    page,
  }) => {});
  test("/getting-started/confirmation should show a confirmation message if the user succesfully signed up", async ({
    page,
  }) => {
    // can't develop this test because the signup process is not implemented yet
  });
});
