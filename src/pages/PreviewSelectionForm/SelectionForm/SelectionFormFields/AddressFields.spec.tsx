import { AddressFields } from "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/AddressFields";
import { renderWithProviders, setupGoogleMock } from "src/utils/test-utils";
import { Formik, Form } from "@appquality/appquality-design-system";
import { fireEvent, waitFor } from "@testing-library/react";

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
beforeAll(() => setupGoogleMock());
describe("Address Fields", () => {
  it("should render something", async function () {
    const { findByTestId } = renderWithProviders(
      <Formik
        initialValues={{
          country: "",
          city: "",
        }}
        onSubmit={() => {}}
      >
        <Form>
          <AddressFields
            label="address"
            countryField="country"
            cityField="city"
            countryCode="IT"
          />
        </Form>
      </Formik>
    );
    expect(
      await findByTestId("preselectionForm-addressField")
    ).toBeInTheDocument();
  });
  it("should change country if selected", async () => {
    const { container, getByText } = renderWithProviders(
      <Formik
        initialValues={{
          country: "",
          city: "",
        }}
        onSubmit={() => {}}
      >
        <Form>
          <AddressFields
            label="address"
            countryField="country"
            cityField="city"
            countryCode="IT"
          />
        </Form>
      </Formik>
    );
    const country = container.querySelector(".css-1hb7zxy-IndicatorsContainer");
    if (!country) throw new Error("country not found");
    expect(country).not.toBeNull();
    // const user = userEvent.setup()
    // await user.click(country)
    // await user.keyboard('ita')
    // expect(await findByText('Italy')).toBeVisible()
    fireEvent.mouseDown(country, { button: 0 });
    await waitFor(() => expect(getByText("Afghanistan")).toBeVisible());

    // const mySelectComponent = queryByTestId('my-select-component');
    // expect(mySelectComponent).toBeDefined();
    // expect(mySelectComponent).not.toBeNull();
    // fireEvent.mouseDown(mySelectComponent);
  });
});
