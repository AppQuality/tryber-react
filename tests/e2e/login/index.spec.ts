import { Login } from "../../fixtures/Login";
import { test, expect } from "../../fixtures/I18n";

let login: Login;

test.describe("if the user is logged in", () => {
  test("the url /login should redirect to the dashboard in current language", async ({
    page,
  }) => {
    login = new Login(page);
    await login.loggedIn();
    await login.visitLoginPage();
    expect(page.url()).toContain("/my-dashboard");
  });
});

test.describe("if the user is logged out", () => {
  test("/login should display the login form", async ({ page }) => {
    login = new Login(page);
    await login.loggedOut();
    await login.visitLoginPage();
    expect(page.url()).toContain("/login");
  });
  test("if tries to access a logged only page should see login component", async ({
    page,
  }) => {});
});

test.describe("the login page ", () => {
  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await login.loggedOut();
    await login.visitLoginPage();
  });
  test("should display a navigation to change language", async ({ page }) => {
    expect(
      await page.waitForSelector(".lang-navigation", { state: "visible" })
    ).toBeTruthy();
  });
  test("should display the login page title in current language", async ({
    page,
    i18n,
  }) => {
    await expect(
      page.getByRole("heading", { name: i18n.t("login page title") })
    ).toBeVisible();
    expect(await login.getTitle()).toContain("Log in to Tryber");
    await login.visitLoginPage("en");
    expect(await login.getTitle()).toContain("Log in to Tryber");
    await login.visitLoginPage("es");
    expect(await login.getTitle()).toContain("Iniciar sesión en Tryber");
    await login.visitLoginPage("it");
    expect(await login.getTitle()).toContain("Accedi a Tryber");
  });
  test("should display the login button with facebook", async ({ page }) => {
    expect(
      await page.waitForSelector(".login-facebook", { state: "visible" })
    ).toBeTruthy();
  });
  test("should display the login button with linkedin", async ({ page }) => {});
  test("should display the email input", async ({ page }) => {});
  test("should display the password input", async ({ page }) => {});
  test("should display the login button", async ({ page }) => {});
  test("should display the link to lost-password page", async ({ page }) => {});
  test("should display the link to the getting-started page", async ({
    page,
  }) => {});

  // todo: component testing LagNav component
  // test("should display in bold the current language", async ({}) => {});
  // test("if the user clicks on a language link should change language", async ({}) => {});
  test("if the user clicks the submit button and the mail is empty should display an error message", async ({}) => {});
  test("if the user clicks the submit button and the mail is not valid should display an error message", async ({}) => {});
  test("if the user clicks the submit button and the password is empty should display an error message", async ({}) => {});
  test("if the user clicks the submit button and the ajax response is false should display an error message", async ({}) => {
    // the error message should be "Email or password are wrong"
  });
  test("if the user clicks the submit button and the code response is 500 should display an error message that propmt the user to retry", async ({}) => {
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
