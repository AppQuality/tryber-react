import { SelectionForm } from "src/pages/PreviewSelectionForm/SelectionForm/SelectionForm";
import { renderWithProviders, setupGoogleMock } from "src/utils/test-utils";
import {
  mockedCompatibleDevicesResponse,
  mockedCufResponse,
  mockedFormResponse,
} from "src/pages/PreviewSelectionForm/SelectionForm/mockedData";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: "en",
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    id: "3414",
  }),
}));

export const handlers = [
  rest.get(
    "http://localhost/users/me/campaigns/3414/forms",
    (req, res, ctx) => {
      return res(ctx.json(mockedFormResponse), ctx.delay(50));
    }
  ),
  rest.get("http://localhost/custom_user_fields", (req, res, ctx) => {
    return res(ctx.json(mockedCufResponse), ctx.delay(50));
  }),
  rest.get(
    "http://localhost/users/me/campaigns/3414/compatible_devices",
    (req, res, ctx) => {
      return res(ctx.json(mockedCompatibleDevicesResponse), ctx.delay(50));
    }
  ),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

beforeAll(() => setupGoogleMock());
describe("selection form", () => {
  it("should return form fields", async function () {
    const { findByText } = renderWithProviders(<SelectionForm />);
    expect(await findByText("_FORM_LABEL_DEVICES_")).toBeInTheDocument();
    expect(
      await findByText("Indica la tua nazione e città di residenza")
    ).toBeVisible();
    expect(await findByText("Seleziona il tuo genere")).toBeVisible();
    expect(await findByText("_FORM_BUTTON_SEND-FORM_")).toBeInTheDocument();
    screen.debug();
  });
});
