import { test, expect } from "@playwright/test";
import { Login } from "../../fixtures/Login";

let login: Login;

test.describe("if the user is logged in", () => {
  test("the url /login should redirect to the dashboard", async ({ page }) => {
    login = new Login(page);
    await login.visitLoginPage();
    expect(page.url()).toBe("/my-dashboard");
  });
});

test.describe("if the user is logged out", () => {
  test("/login should display the login form", async ({ page }) => {});
  test("if tries to access a logged only page should see login component", async ({
    page,
  }) => {});
});

test.describe("the login page ", () => {
  test("should display the login button with facebook", async ({ page }) => {});
  test("should display the login button with linkedin", async ({ page }) => {});
  test("should display the email input", async ({ page }) => {});
  test("should display the password input", async ({ page }) => {});
  test("should display the login button", async ({ page }) => {});
  test("should display the link to lost-password page", async ({ page }) => {});
  test("should display the link to the getting-started page", async ({
    page,
  }) => {});

  test("should display a navigation to change language", async ({}) => {});
  test("should display in bold the current language", async ({}) => {});
  test("if the user clicks on a language link should change language", async ({}) => {});
  test("if the user clicks on Login and fields are valid should navigate to the dashboard", async ({}) => {});
  test("if the user clicks the submit button and the mail is empty should display an error message", async ({}) => {});
  test("if the user clicks the submit button and the mail is not valid should display an error message", async ({}) => {});
  test("if the user clicks the submit button and the password is empty should display an error message", async ({}) => {});
  test("if the user clicks the submit button and the ajax response is false should display an error message", async ({}) => {
    // the error message should be "Email or password are wrong"
  });
  test("if the user clicks the submit button and the code response is 500", async ({}) => {
    // the error message should be "Something went wrong, please try again"
  });
});
test.describe("if login is successful ", () => {
  test("if the user comes from /login the user is redirected to dashboard", async ({
    page,
  }) => {});
  test("if the user comes from a logged only page the user remain in the same page", async ({
    page,
  }) => {});
});
