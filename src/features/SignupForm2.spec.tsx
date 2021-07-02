import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";
import selectEvent from "react-select-event";

import userEvent from "@testing-library/user-event";
import API from "../utils/api";
import { mocked } from "ts-jest/utils";

import {
  aqBootstrapTheme,
  ThemeProvider,
} from "@appquality/appquality-design-system";

import { SignupForm } from "./SignupForm";
import "../i18n";

jest.mock("../utils/api");

const mockedApi = mocked(API, true);

const signupData = {
  name: "Pippo",
  surname: "Franco",
  country: "Italy",
  birthDate: "1990-04-18",
  email: "pippo.franco@example.com",
  password: "pippoFranco0",
};

const weakPasswords = [
  { pass: "pippo", message: "Must be at least 6 character long " },
  { pass: "pippofranco", message: "Must contain at least a number " },
  { pass: "pippoFranco", message: "Must contain at least a number " },
  {
    pass: "pippofranco0",
    message: "Must contain at least an uppercase letter ",
  },
];
const getFormFields = () => {
  const nameField = document.querySelector('input[name="name"]');
  const surnameField = document.querySelector('input[name="surname"]');
  const mailField = document.querySelector('input[name="email"]');
  const countrySelect = document.querySelector("#country") as HTMLElement;
  const datePicker = document.querySelector("input.mbsc-textfield-box");
  const passwordField = document.querySelector('input[name="password"]');
  const tosCheckbox = document.querySelector('input[name="subscribe"]');
  const submitButton = document.querySelector('button[type="submit"]');

  return [
    nameField,
    surnameField,
    mailField,
    countrySelect,
    datePicker,
    passwordField,
    tosCheckbox,
    submitButton,
  ];
};

const getForm = () => {
  return screen.getByTestId("signupForm");
};

beforeEach(() => {
  render(
    <ThemeProvider theme={aqBootstrapTheme}>
      <SignupForm redirectUrl="/" />
    </ThemeProvider>
  );
});

describe("Signup form: ", () => {
  test("it should render all form components", () => {
    const [
      nameField,
      surnameField,
      mailField,
      countrySelect,
      datePicker,
      passwordField,
      tosCheckbox,
      submitButton,
    ] = getFormFields();

    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(nameField).toBeInTheDocument();
    expect(surnameField).toBeInTheDocument();
    expect(mailField).toBeInTheDocument();
    expect(countrySelect).toBeInTheDocument();
    expect(datePicker).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(tosCheckbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("it shouldn't be possible to submit unless all values are filled", async () => {
    const [
      nameField,
      surnameField,
      mailField,
      countrySelect,
      datePicker,
      passwordField,
      tosCheckbox,
      submitButton,
    ] = getFormFields();
    const form = getForm();
    // type guard for typescript, because queryselector can return null
    if (
      !nameField ||
      !surnameField ||
      !mailField ||
      !countrySelect ||
      !datePicker ||
      !passwordField ||
      !tosCheckbox ||
      !submitButton
    ) {
      throw new Error("some field wasn't found");
    }
    expect(submitButton).toHaveAttribute("disabled");

    userEvent.type(nameField, signupData.name);
    await waitFor(() => {
      expect(submitButton).toHaveAttribute("disabled");
    });

    userEvent.type(surnameField, signupData.surname);
    await waitFor(() => {
      expect(submitButton).toHaveAttribute("disabled");
    });

    userEvent.type(mailField, signupData.email);
    await waitFor(() => {
      expect(submitButton).toHaveAttribute("disabled");
    });

    const _countrySelect = countrySelect as HTMLElement;
    await selectEvent.select(_countrySelect, "Italy");
    await waitFor(() => {
      expect(submitButton).toHaveAttribute("disabled");
    });

    userEvent.click(datePicker);
    await waitFor(async () => {
      const overlay = document.querySelector(".mbsc-popup-overlay");
      if (!overlay) throw new Error("datepicker not open");
    });

    const options = Array.prototype.slice.call(
      document.querySelectorAll(".mbsc-scroller-wheel-item")
    );
    const buttons = Array.prototype.slice.call(
      document.querySelectorAll(".mbsc-popup-button")
    );
    const Y = options.filter((option) => option.innerHTML === "1990");
    const M = options.filter((option) => option.innerHTML === "April");
    const D = options.filter((option) => option.innerHTML === "18");
    const Set = buttons.filter((button) => button.innerHTML === "Set");

    userEvent.click(Y[0]);
    await waitFor(() => {});

    userEvent.click(M[0]);
    await waitFor(() => {});

    userEvent.click(D[0]);
    await waitFor(() => {});

    userEvent.click(Set[0]);
    await waitFor(() => {
      expect(submitButton).toHaveAttribute("disabled");
    });

    userEvent.type(passwordField, signupData.password);
    await waitFor(() => {
      expect(form).toHaveFormValues({ password: signupData.password });
    });
    expect(submitButton).toHaveAttribute("disabled");

    userEvent.click(tosCheckbox);
    await waitFor(() => {
      expect(tosCheckbox).toBeChecked();
    });
    expect(form).toHaveFormValues({ subscribe: true });
    expect(submitButton).not.toHaveAttribute("disabled");
  });

  test("it should call the signup api on submit", async () => {
    const [
      nameField,
      surnameField,
      mailField,
      countrySelect,
      datePicker,
      passwordField,
      tosCheckbox,
      submitButton,
    ] = getFormFields();
    const form = getForm();
    // type guard for typescript, because queryselector can return null
    if (
      !nameField ||
      !surnameField ||
      !mailField ||
      !countrySelect ||
      !datePicker ||
      !passwordField ||
      !tosCheckbox ||
      !submitButton
    ) {
      throw new Error("some field wasn't found");
    }
    mockedApi.signup.mockResolvedValueOnce(signupData);

    userEvent.type(nameField, signupData.name);
    await waitFor(() => {
      expect(form).toHaveFormValues({ name: signupData.name });
    });

    userEvent.type(surnameField, signupData.surname);
    await waitFor(() => {
      expect(form).toHaveFormValues({ surname: signupData.surname });
    });

    userEvent.type(mailField, signupData.email);
    await waitFor(() => {
      expect(form).toHaveFormValues({ email: signupData.email });
    });

    const _countrySelect = countrySelect as HTMLElement;
    await selectEvent.select(_countrySelect, "Italy");
    await waitFor(() => {
      expect(form).toHaveFormValues({ country: "Italy" });
    });

    userEvent.click(datePicker);
    await waitFor(async () => {
      const overlay = document.querySelector(".mbsc-popup-overlay");
      if (!overlay) throw new Error("datepicker not open");
      expect(overlay).toBeInTheDocument();
    });

    const options = Array.prototype.slice.call(
      document.querySelectorAll(".mbsc-scroller-wheel-item")
    );
    const buttons = Array.prototype.slice.call(
      document.querySelectorAll(".mbsc-popup-button")
    );
    const Y = options.filter((option) => option.innerHTML === "1990");
    const M = options.filter((option) => option.innerHTML === "April");
    const D = options.filter((option) => option.innerHTML === "18");
    const Set = buttons.filter((button) => button.innerHTML === "Set");

    userEvent.click(Y[0]);
    await waitFor(() => {});

    userEvent.click(M[0]);
    await waitFor(() => {});

    userEvent.click(D[0]);
    await waitFor(() => {});

    userEvent.click(Set[0]);
    await waitFor(() => {
      expect(datePicker.getAttribute("value")).toBe("04/18/1990");
    });

    userEvent.type(passwordField, signupData.password);
    await waitFor(() => {
      expect(form).toHaveFormValues({ password: signupData.password });
    });

    userEvent.click(tosCheckbox);
    await waitFor(() => {
      expect(tosCheckbox).toBeChecked();
    });
    expect(form).toHaveFormValues({ subscribe: true });
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(API.signup).toHaveBeenCalledWith(signupData);
      expect(API.signup).toHaveBeenCalledTimes(1);
    });
  });

  describe("Weak Passwords:", () => {
    test.each(weakPasswords)(
      "writing %p as password, returns an invalid feedback",
      async (weakPassword) => {
        userEvent.type(screen.getByLabelText("Password"), weakPassword.pass);
        screen.getByLabelText("Password").blur();
        await waitFor(() => {
          expect(screen.getByLabelText("Password")).toHaveValue(
            weakPassword.pass
          );
        });
        const label = document.querySelector("[for='signupForm-password']");
        if (!label) throw new Error("there's no label");
        const inputContainer = label.nextElementSibling;
        if (!inputContainer) throw new Error("there's no input container");
        const errorMessage = inputContainer.nextElementSibling;
        if (!errorMessage) throw new Error("there's no error message");
        expect(errorMessage).toHaveStyle(
          `color: ${aqBootstrapTheme.palette.danger}`
        );
        expect(errorMessage.innerHTML).toBe(weakPassword.message);
      }
    );
  });
});
