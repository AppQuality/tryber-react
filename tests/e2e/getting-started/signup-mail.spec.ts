import { DashboardPage } from "../../fixtures/DashboardPage";
import { GettingStartedSignup } from "../../fixtures/GettingStarted/GettingStartedSignup";
import { expect, test } from "../../fixtures/I18n";

let gettingStarted: GettingStartedSignup;
let dashboard: DashboardPage;

test(`if the user is logged in The signup mail page should redirect to the dashboard`, async ({
  page,
  i18n,
}) => {
  gettingStarted = new GettingStartedSignup({ page, i18n });
  await gettingStarted.loggedIn();
  await gettingStarted.visit();
  dashboard = new DashboardPage(page);
  await expect(page).toHaveURL(new RegExp(`${dashboard.url}/$`));
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
  test("should display a list of password requirements", async ({ page }) => {
    await expect(
      gettingStarted.elements().passwordRequirements()
    ).toBeVisible();

    await expect(page.getByTestId("password-requirement-length")).toBeVisible();
    await gettingStarted.fillPasswordWith("pass");
    await expect(
      page
        .getByTestId("password-requirement-length")
        .getByTestId("password-requirement-error")
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("password");
    await expect(
      page
        .getByTestId("password-requirement-length")
        .getByTestId("password-requirement-success")
    ).toBeVisible();

    await expect(page.getByTestId("password-requirement-number")).toBeVisible();
    await gettingStarted.fillPasswordWith("password");
    await expect(
      page
        .getByTestId("password-requirement-number")
        .getByTestId("password-requirement-error")
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("password1");
    await expect(
      page
        .getByTestId("password-requirement-number")
        .getByTestId("password-requirement-success")
    ).toBeVisible();

    await expect(
      page.getByTestId("password-requirement-uppercase")
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("password");
    await expect(
      page
        .getByTestId("password-requirement-uppercase")
        .getByTestId("password-requirement-error")
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("PASSWORD");
    await expect(
      page
        .getByTestId("password-requirement-uppercase")
        .getByTestId("password-requirement-success")
    ).toBeVisible();

    await expect(
      page.getByTestId("password-requirement-lowercase")
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("PASSWORD");
    await expect(
      page
        .getByTestId("password-requirement-lowercase")
        .getByTestId("password-requirement-error")
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("password");
    await expect(
      page
        .getByTestId("password-requirement-lowercase")
        .getByTestId("password-requirement-success")
    ).toBeVisible();
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
      page.getByText(i18n.t("SIGNUP_FORM:::Email is required"))
    ).toBeVisible();
  });
  test("if the user click the submit button without doing anything should display an error message", async ({
    page,
    i18n,
  }) => {
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(i18n.t("SIGNUP_FORM:::Email is required")).first()
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
      page.getByText(i18n.t("SIGNUP_FORM:::Email must be a valid email"))
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
      page.getByText(i18n.t("SIGNUP_FORM:::Password is a required field"))
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
      page.getByText(
        i18n.t("SIGNUP_FORM:::Password must be at least 6 character long")
      )
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("password");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(
        i18n.t("SIGNUP_FORM:::Password must contain at least a number")
      )
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("password1");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(
        i18n.t(
          "SIGNUP_FORM:::Password must contain at least an uppercase letter"
        )
      )
    ).toBeVisible();
    await gettingStarted.fillPasswordWith("PASSWORD1");
    await gettingStarted.elements().nextButton().click();
    await expect(
      page.getByText(
        i18n.t(
          "SIGNUP_FORM:::Password must contain at least a lowercase letter"
        )
      )
    ).toBeVisible();
  });
  test("if the user click the submit but mail is already present in db an error notification should appear", async ({
    page,
  }) => {
    await gettingStarted.fillEmailAndPasswordWithExistingEmail();
    await gettingStarted.elements().nextButton().click();
    await expect(page.getByTestId("email-already-exists-toastr")).toBeVisible();
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
    // todo: update stepper component to expose current step
  });
  test("should display a required name field", async ({}) => {
    await expect(gettingStarted.elements().nameInput()).toBeVisible();
    await expect(gettingStarted.elements().nameInput()).toHaveAttribute(
      "required"
    );
    await expect(gettingStarted.elements().nameInput()).toHaveAttribute(
      "aria-required",
      "true"
    );
  });
  test("should display a required last name field", async ({}) => {
    await expect(gettingStarted.elements().surnameInput()).toBeVisible();
    await expect(gettingStarted.elements().surnameInput()).toHaveAttribute(
      "required"
    );
    await expect(gettingStarted.elements().surnameInput()).toHaveAttribute(
      "aria-required",
      "true"
    );
  });
  test("should display a required birthdate field", async ({}) => {
    await expect(gettingStarted.elements().birthdateInput()).toBeVisible();
    await expect(gettingStarted.elements().birthdateInput()).toHaveAttribute(
      "required"
    );
    await expect(gettingStarted.elements().birthdateInput()).toHaveAttribute(
      "aria-required",
      "true"
    );
  });
  test("should display a required country field", async ({}) => {
    await expect(gettingStarted.elements().countryInput()).toBeVisible();
    // todo: change select component in des system to expose required attribute
    // await expect(gettingStarted.elements().birthdateInput()).toHaveAttribute("required");
  });
  test("should display a required checkbox to accept mail", async ({}) => {
    await expect(gettingStarted.elements().mailCheckbox()).toBeVisible();
    // todo: change checkbox component in des system to expose required attribute
    // await expect(gettingStarted.elements().birthdateInput()).toHaveAttribute("required");
  });
  test("should display a link to terms and conditions", async ({}) => {
    await expect(gettingStarted.elements().termsLink()).toBeVisible();
  });
  test("should display a target _blank link to privacy policy", async ({}) => {
    await expect(gettingStarted.elements().privacyLink()).toBeVisible();
    await expect(gettingStarted.elements().privacyLink()).toHaveAttribute(
      "target",
      "_blank"
    );
  });
  test("should display a target _blank link to ethical code", async ({}) => {
    await expect(gettingStarted.elements().ethicalLink()).toBeVisible();
    await expect(gettingStarted.elements().ethicalLink()).toHaveAttribute(
      "target",
      "_blank"
    );
  });
  test("should display a button to go back to the first step", async ({}) => {
    await expect(gettingStarted.elements().backButton()).toBeVisible();
  });
  test("should display a button to submit", async ({}) => {
    await expect(gettingStarted.elements().submitButton()).toBeVisible();
  });

  test("if the user click the terms and conditions link another tab is opened to /terms-and-conditions in the current language", async ({
    context,
    i18n,
  }) => {
    const pagePromise = context.waitForEvent("page");
    const termsAndConditions = gettingStarted.elements().termsLink();
    await expect(termsAndConditions).toHaveAttribute("target", "_blank");
    await termsAndConditions.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(
      i18n.t("/terms-and-conditions/", {
        ns: "links",
      })
    );
  });
  test("if the user click the privacy policy link another tab is opened to https://www.iubenda.com/privacy-policy/7934311", async ({
    context,
    i18n,
  }) => {
    const pagePromise = context.waitForEvent("page");
    const termsAndConditions = gettingStarted.elements().privacyLink();
    await expect(termsAndConditions).toHaveAttribute("target", "_blank");
    await termsAndConditions.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(
      i18n.t(
        i18n.t("/privacy-policy/", {
          ns: "links",
        })
      )
    );
  });
  test("if the user click the ethical code link another tab is opened to /ethical-code in the current language", async ({
    context,
    i18n,
  }) => {
    const pagePromise = context.waitForEvent("page");
    const termsAndConditions = gettingStarted.elements().ethicalLink();
    await expect(termsAndConditions).toHaveAttribute("target", "_blank");
    await termsAndConditions.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(
      i18n.t("/ethical-code/", {
        ns: "links",
      })
    );
  });

  test("if the user click to the back button got to the first step (precompiled)", async ({}) => {
    await gettingStarted.elements().backButton().click();
    await expect(gettingStarted.elements().emailInput()).toHaveAttribute(
      "value",
      "test@example.com"
    );
    await expect(gettingStarted.elements().passwordInput()).toHaveAttribute(
      "value",
      "Password1!"
    );
  });
  test("if the user change mail or password in the first step and proceed the data are precompiled", async ({}) => {
    await gettingStarted.fillSecondStepWithValidData();
    await gettingStarted.elements().backButton().click();
    await gettingStarted.fillEmailWith("another@valid.email");
    await gettingStarted.elements().nextButton().click();
    await expect(gettingStarted.elements().nameInput()).toHaveAttribute(
      "value",
      "Test"
    );
    await expect(gettingStarted.elements().surnameInput()).toHaveAttribute(
      "value",
      "User"
    );
    await expect(gettingStarted.elements().birthdateInput()).toHaveAttribute(
      "value",
      "01/01/1990"
    );
    await expect(gettingStarted.elements().countryInput()).toHaveText("Italy");
  });

  // test("if the user click to submit and all required fields are correctly filled goes to the confirmation step", async ({}) => {
  //   await gettingStarted.fillSecondStepWithValidData();
  //   await gettingStarted.elements().submitButton().click();
  //   await expect(gettingStarted.elements().confirmationStep()).toBeVisible();
  // });
  // test("if the user click to submit and api answer with a generic error should display a generic error notification to retry", async ({}) => {
  //   throw new Error("Not implemented");
  // });
  // // todo test("if the user click to submit and api answer with a validation error should display a specific error message to change the field", async ({}) => {throw new Error("Not implemented")});
  // test("if the user click to submit and api answer that mail is already in db we show a specific error notification to use a different mail", async ({}) => {
  //   throw new Error("Not implemented");
  // });
});

// todo: instant feedback for password requirements
