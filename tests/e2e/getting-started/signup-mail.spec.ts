import { test, expect } from "@playwright/test";
import { GettingStarted } from "../../fixtures/GettingStarted";

let gettingStarted: GettingStarted;

test.describe("The signup mail page", () => {
  test("should display a navigation to change language", async ({}) => {});
  test("should display in bold the current language", async ({}) => {});
  test("if the user click on a language link should change language", async ({}) => {});
  test("should display a stepper component with the current step highlited and next step disabled", async ({}) => {});
  test("should display a mail field", async ({}) => {});
  test("should display a password field", async ({}) => {});
  test("should display a list of password requirements", async ({}) => {});
  test("should display a submit button", async ({}) => {});
  test("if the user click the submit button and the mail is empty should display an error message", async ({}) => {});
  test("if the user click the submit button and the mail is not valid should display an error message", async ({}) => {});
  test("if the user click the submit button and the password is empty should display an error message", async ({}) => {});
  test("if the user click the submit button and the password is not valid should display an error message", async ({}) => {});
  test("if the user click the submit button and mail and password are valid but mail is already present in db an error message should appear", async ({}) => {});
  test("if the user click the submit button and mail and password are valid should display the second step (profile data)", async ({}) => {});
  // todo: check email in first step or in second step?
  // todo: use une step signup or two step signup?
});

test.describe("The signup mail page second step", () => {
  test("should display a required name field", async ({}) => {});
  test("should display a required last name field", async ({}) => {});
  test("should display a required birthdate field", async ({}) => {});
  test("if the user click on submit and the format is not gg/mm/aaaa an error is shown", async ({}) => {});
  test("should display a required country field", async ({}) => {});
  test("if the user click the terms and conditions link another tab is opened to /terms-and-conditions in the current language", async ({}) => {});
  test("should display a link privacy policy", async ({}) => {});
  test("if the user click the privacy policy link another tab is opened to https://www.iubenda.com/privacy-policy/7934311", async ({}) => {});
  test("should display a link to ethical code", async ({}) => {});
  test("if the user click the ethical code link another tab is opened to /ethical-code in the current language", async ({}) => {});
  test("should display a button to go back to the first step", async ({}) => {});
  test("if the user click to the back button got to the first step (precompiled)", async ({}) => {});
  test("if the user change mail or password in the first step and proceed the data are precompiled", async ({}) => {});
  test("should display a button to submit", async ({}) => {});
  test("if the user click to submit and all required fields are correctly filled goes to the confirmation step", async ({}) => {});
  test("if the user click to submit and api answer with a generic error should display a generic error message to retry", async ({}) => {});
  // todo test("if the user click to submit and api answer with a validation error should display a specific error message to change the field", async ({}) => {});
  test("if the user click to submit and api answer that mail is already in db we show a specific error message to change mail", async ({}) => {});
});

// todo: instant feedback for password requirements
