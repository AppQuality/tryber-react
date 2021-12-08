import {
  aqBootstrapTheme,
  ThemeProvider,
} from "@appquality/appquality-design-system";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import API from "src/utils/api";
import { mocked } from "ts-jest/utils";
import "../i18n";
import { SignupForm } from "./SignupForm";

jest.mock("../utils/api");

const mockedApi = mocked(API, true);

const signupData = {
  name: "Pippo",
  surname: "Franco",
  email: "pippo.franco@example.com",
  password: "pippoFranco0",
};

const weakPasswords = ["pippo", "pippofranco", "pippofranco0", "pippoFranco"];

beforeEach(() => {
  render(
    <ThemeProvider theme={aqBootstrapTheme}>
      <SignupForm redirectUrl="/" />
    </ThemeProvider>
  );
});

test("SignupForm button should be disabled until all input are filled correctly", async () => {
  expect(screen.getByText("Create an account")).toBeInTheDocument();

  expect(screen.getByLabelText("Name")).toHaveAttribute("type", "text");
  expect(screen.getByLabelText("Surname")).toHaveAttribute("type", "text");
  expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");

  expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  expect(screen.getByRole("button")).toHaveAttribute("disabled");

  userEvent.type(screen.getByLabelText("Name"), signupData.name);
  await waitFor(() => {
    expect(screen.getByLabelText("Name")).toHaveValue(signupData.name);
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  userEvent.type(screen.getByLabelText("Surname"), signupData.surname);
  await waitFor(() => {
    expect(screen.getByLabelText("Surname")).toHaveValue(signupData.surname);
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  userEvent.type(screen.getByLabelText("Email"), signupData.email);
  await waitFor(() => {
    expect(screen.getByLabelText("Email")).toHaveValue(signupData.email);
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  userEvent.type(screen.getByLabelText("Password"), signupData.password);
  await waitFor(() => {
    expect(screen.getByLabelText("Password")).toHaveValue(signupData.password);
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  userEvent.click(
    screen.getByLabelText(
      "I agree to receive earning opportunity emails from AppQuality"
    )
  );
  await waitFor(() => {
    expect(
      screen.getByLabelText(
        "I agree to receive earning opportunity emails from AppQuality"
      )
    ).toBeChecked();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});

test("SignupForm fields should show a validation error when not validating", async () => {
  expect(screen.getByText("Create an account")).toBeInTheDocument();

  screen.getByLabelText("Name").focus();
  screen.getByLabelText("Name").blur();
  await waitFor(() => {
    expect(screen.getByLabelText("Name").classList.contains("is-invalid")).toBe(
      true
    );
  });

  screen.getByLabelText("Surname").focus();
  screen.getByLabelText("Surname").blur();
  await waitFor(() => {
    expect(
      screen.getByLabelText("Surname").classList.contains("is-invalid")
    ).toBe(true);
  });

  screen.getByLabelText("Email").focus();
  screen.getByLabelText("Email").blur();
  await waitFor(() => {
    expect(
      screen.getByLabelText("Email").classList.contains("is-invalid")
    ).toBe(true);
  });

  screen.getByLabelText("Password").focus();
  screen.getByLabelText("Password").blur();
  await waitFor(() => {
    expect(
      screen.getByLabelText("Password").classList.contains("is-invalid")
    ).toBe(true);
  });
});

describe("Weak Passwords", () => {
  test.each(weakPasswords)(
    "writing %p as password, returns an invalid feedback",
    async (weakPassword) => {
      userEvent.type(screen.getByLabelText("Password"), weakPassword);
      screen.getByLabelText("Password").blur();
      await waitFor(() => {
        expect(screen.getByLabelText("Password")).toHaveValue(weakPassword);
        expect(
          screen.getByLabelText("Password").classList.contains("is-invalid")
        ).toBe(true);
      });
    }
  );
});

test("SignupForm should call the signup api on submit", async () => {
  mockedApi.signup.mockResolvedValueOnce(signupData);

  userEvent.type(screen.getByLabelText("Name"), signupData.name);
  await waitFor(() => {
    expect(screen.getByLabelText("Name")).toHaveValue(signupData.name);
  });

  userEvent.type(screen.getByLabelText("Surname"), signupData.surname);
  await waitFor(() => {
    expect(screen.getByLabelText("Surname")).toHaveValue(signupData.surname);
  });

  userEvent.type(screen.getByLabelText("Email"), signupData.email);
  await waitFor(() => {
    expect(screen.getByLabelText("Email")).toHaveValue(signupData.email);
  });

  userEvent.type(screen.getByLabelText("Password"), signupData.password);
  await waitFor(() => {
    expect(screen.getByLabelText("Password")).toHaveValue(signupData.password);
  });

  userEvent.click(
    screen.getByLabelText(
      "I agree to receive earning opportunity emails from AppQuality"
    )
  );
  await waitFor(() => {
    expect(
      screen.getByLabelText(
        "I agree to receive earning opportunity emails from AppQuality"
      )
    ).toBeChecked();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });

  userEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(API.signup).toHaveBeenCalledWith(signupData);
    expect(API.signup).toHaveBeenCalledTimes(1);
  });
});
