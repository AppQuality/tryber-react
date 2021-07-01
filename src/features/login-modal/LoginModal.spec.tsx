import { findByText, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";

import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";

import {
  aqBootstrapTheme,
  ThemeProvider,
} from "@appquality/appquality-design-system";

import { LoginModal } from "./LoginModal";
import "../../i18n";
import WPAPI from "../../utils/wpapi";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../utils/wpapi");

const mockedApi = mocked(WPAPI, true);
const security = "security";

const loginData = {
  username: "pippo.franco@example.com",
  password: "pippoFranco0",
  security: security,
};

beforeEach(() => {
  const reloadSpy = jest.fn();
  Object.defineProperty(window, "location", {
    value: { reload: reloadSpy },
  });

  render(
    <BrowserRouter>
      <ThemeProvider theme={aqBootstrapTheme}>
        <LoginModal isOpen onClose={() => {}} />
      </ThemeProvider>
    </BrowserRouter>
  );
});

test("LoginForm button should be disabled until all input are filled correctly", async () => {
  expect(screen.getByText("login with your credentials")).toBeInTheDocument();

  expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");

  expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  expect(screen.getByRole("button")).toHaveAttribute("disabled");

  userEvent.type(screen.getByLabelText("Password"), loginData.password);
  await waitFor(() => {
    expect(screen.getByLabelText("Password")).toHaveValue(loginData.password);
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});

test("Login form email field should show a validation error when not validating", async () => {
  expect(screen.getByText("login with your credentials")).toBeInTheDocument();

  const input = screen.getByLabelText("Email");
  input.focus();
  input.blur();
  await waitFor(async () => {
    const container = screen.getByTestId("email-input-group");
    expect(
      await findByText(container, "This is a required field")
    ).toBeVisible();
  });

  const passwordInput = screen.getByLabelText("Password");
  passwordInput.focus();
  passwordInput.blur();
  await waitFor(async () => {
    const container = screen.getByTestId("password-input-group");
    expect(
      await findByText(container, "This is a required field")
    ).toBeVisible();
  });
});

// describe("Wrong Password", () => {
//   userEvent.type(screen.getByLabelText("Password"), 'wrongPassword');
//   screen.getByLabelText("Password").blur();
//   await waitFor(() => {
//     expect(screen.getByLabelText("Password")).toHaveValue('wrongPassword');
//     expect(
//       screen.getByLabelText("Password").classList.contains("is-invalid")
//     ).toBe(true);
// });

test("SignupForm should call the signup api on submit", async () => {
  mockedApi.login.mockResolvedValueOnce(true);
  mockedApi.getNonce.mockResolvedValueOnce(security);

  userEvent.type(screen.getByLabelText("Email"), loginData.username);
  await waitFor(() => {
    expect(screen.getByLabelText("Email")).toHaveValue(loginData.username);
  });

  userEvent.type(screen.getByLabelText("Password"), loginData.password);
  await waitFor(() => {
    expect(screen.getByLabelText("Password")).toHaveValue(loginData.password);
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });

  userEvent.click(screen.getByRole("button"));
  await waitFor(() => {
    expect(WPAPI.login).toHaveBeenCalledWith(loginData);
    expect(WPAPI.login).toHaveBeenCalledTimes(1);
  });
});
