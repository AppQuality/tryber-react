import { GettingStartedSignup } from "../../fixtures/GettingStarted/GettingStartedSignup";
import { expect, test } from "../../fixtures/I18n";

let gettingStarted: GettingStartedSignup;

test(`if the user is logged in The signup mail page should redirect to the dashboard`, async ({
  page,
  i18n,
}) => {
  gettingStarted = new GettingStartedSignup({ page, i18n });
  await gettingStarted.loggedIn();
  await gettingStarted.visit();
  expect(await page.url()).toContain("my-dashboard");
});
test.describe("The signup mail page", () => {
  test.beforeEach(async ({ page, i18n }) => {
    gettingStarted = new GettingStartedSignup({ page, i18n });
    await gettingStarted.loggedOut();
    await gettingStarted.visit();
  });
  test(`if the user is logged out should display the page to signup with email`, async ({
    page,
  }) => {
    await expect(page.getByTestId("tryber-mail-signup")).toBeVisible();
  });
  test("should display a navigation to change language", async ({ page }) => {
    await expect(gettingStarted.elements().languageSwitcher()).toBeVisible();
  });
  test("should display a stepper component", async ({ page }) => {
    await expect(page.getByTestId("signup-stepper")).toBeVisible();
  });
  // todo: test stepper component
  test("should display a mail field", async () => {
    await expect(gettingStarted.elements().emailInput()).toBeVisible();
    await gettingStarted.fillEmailWith("test@example.com");
    const mailInput = gettingStarted.elements().emailInput();
    expect(await mailInput.inputValue()).toBe("test@example.com");
  });
  test("should display a password field", async () => {
    await expect(gettingStarted.elements().passwordInput()).toBeVisible();
    await gettingStarted.fillPasswordWith("Password1!");
    const passwordInput = gettingStarted.elements().passwordInput();
    expect(await passwordInput.inputValue()).toBe("Password1!");
  });
  test("should display a list of password requirements", async ({}) => {
    throw new Error("Not implemented");
  });
  test("should display a submit button", async ({}) => {
    await expect(gettingStarted.elements().nextButton()).toBeVisible();
  });
  test("if the user click the submit button and the mail is empty should display an error message", async ({
    page,
    i18n,
  }) => {
    await gettingStarted.fillEmailAndPasswordWithValidData();
    await gettingStarted.fillEmailWith("");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(i18n.t("This is a required field"))
    ).toBeVisible();
  });
  test("if the user click the submit button and the mail is not valid should display an error message", async ({
    page,
    i18n,
  }) => {
    await gettingStarted.fillEmailAndPasswordWithValidData();
    await gettingStarted.fillEmailWith("notvalidmail");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(i18n.t("Email must be a valid email"))
    ).toBeVisible();
  });
  test("if the user click the submit button and the password is empty should display an error message", async ({
    page,
    i18n,
  }) => {
    await gettingStarted.fillEmailAndPasswordWithValidData();
    await gettingStarted.fillPasswordWith("");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(i18n.t("This is a required field"))
    ).toBeVisible();
  });
  test("if the user click the submit button and the password is not valid should display an error message", async ({
    page,
    i18n,
  }) => {
    await gettingStarted.fillEmailAndPasswordWithValidData();
    await gettingStarted.fillPasswordWith("pass");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(i18n.t("Must be at least 6 character long"))
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("password");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(i18n.t("Must contain at least a number"))
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("password1");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(i18n.t("Must contain at least an uppercase letter"))
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("PASSWORD1");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(i18n.t("Must contain at least a lowercase letter"))
    ).toBeVisible();
  });
  test("if the user click the submit but mail is already present in db an error notification should appear", async ({}) => {
    throw new Error("Not implemented");
  });
  test("if the user click the submit button and mail and password are valid should display the second step (profile data)", async ({}) => {
    await gettingStarted.fillEmailAndPasswordWithValidData();
    await gettingStarted.elements().nextButton().click();
    await expect(gettingStarted.elements().secondStepContainer()).toBeVisible();
  });
});

test.describe("The signup mail page second step", () => {
  test.beforeEach(async ({ page, i18n }) => {
    gettingStarted = new GettingStartedSignup({ page, i18n });
    await gettingStarted.loggedOut();
    await gettingStarted.visitMailSignupPage();
    await gettingStarted.goToSecondStep();
  });
  test("should display a stepper component at the second step", async () => {
    await expect(gettingStarted.elements().languageSwitcher()).toBeVisible();
  });
  test("should display a required name field", async ({}) => {
    throw new Error("Not implemented");
  });
  test("should display a required last name field", async ({}) => {
    throw new Error("Not implemented");
  });
  test("should display a required birthdate field", async ({}) => {
    throw new Error("Not implemented");
  });
  test("should display a required country field", async ({}) => {
    throw new Error("Not implemented");
  });
  test("should display a link privacy policy", async ({}) => {
    throw new Error("Not implemented");
  });
  test("should display a link to ethical code", async ({}) => {
    throw new Error("Not implemented");
  });
  test("should display a button to go back to the first step", async ({}) => {
    throw new Error("Not implemented");
  });
  test("should display a button to submit", async ({}) => {
    throw new Error("Not implemented");
  });

  test("if the user click the terms and conditions link another tab is opened to /terms-and-conditions in the current language", async ({}) => {
    throw new Error("Not implemented");
  });
  test("if the user click the privacy policy link another tab is opened to https://www.iubenda.com/privacy-policy/7934311", async ({}) => {
    throw new Error("Not implemented");
  });
  test("if the user click the ethical code link another tab is opened to /ethical-code in the current language", async ({}) => {
    throw new Error("Not implemented");
  });

  test("if the user click to the back button got to the first step (precompiled)", async ({}) => {
    throw new Error("Not implemented");
  });
  test("if the user change mail or password in the first step and proceed the data are precompiled", async ({}) => {
    throw new Error("Not implemented");
  });

  test("on focus out of the date field if the format is not gg/mm/aaaa an error is shown", async ({}) => {
    throw new Error("Not implemented");
  });
  test("if the user click to submit and all required fields are correctly filled goes to the confirmation step", async ({}) => {
    throw new Error("Not implemented");
  });
  test("if the user click to submit and api answer with a generic error should display a generic error notification to retry", async ({}) => {
    throw new Error("Not implemented");
  });
  // todo test("if the user click to submit and api answer with a validation error should display a specific error message to change the field", async ({}) => {throw new Error("Not implemented")});
  test("if the user click to submit and api answer that mail is already in db we show a specific error notification to use a different mail", async ({}) => {
    throw new Error("Not implemented");
  });
});

// todo: instant feedback for password requirements
