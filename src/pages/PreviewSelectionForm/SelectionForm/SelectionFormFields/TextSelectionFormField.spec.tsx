import { TextSelectionFormField } from "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/TextSelectionFormField";
import { renderWithProviders } from "src/utils/test-utils";
import { Formik, Form } from "@appquality/appquality-design-system";
import { fireEvent } from "@testing-library/react";

jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

describe("text selection form field", () => {
  it("should render", async () => {
    const { findByTestId } = renderWithProviders(
      <Formik
        initialValues={{
          text: "",
        }}
        onSubmit={() => {}}
      >
        <Form>
          <TextSelectionFormField label="text" name="text" />
        </Form>
      </Formik>
    );
    expect(await findByTestId("textSelectionFormField")).toBeVisible();
  });
  it("should change formik value when field value is changed", async () => {
    const { findByTestId, findByLabelText } = renderWithProviders(
      <Formik
        initialValues={{
          textSelectionFormField_testName: "",
        }}
        onSubmit={() => {}}
      >
        {(formikProps) => (
          <Form>
            <TextSelectionFormField
              label="textSelectionFormField_testLabel"
              name="textSelectionFormField_testName"
            />
            <div data-testid="textSelectionFormField_value">
              {formikProps.values.textSelectionFormField_testName}
            </div>
          </Form>
        )}
      </Formik>
    );
    fireEvent.change(
      await findByLabelText("textSelectionFormField_testLabel"),
      { target: { value: "foo" } }
    );
    expect(await findByTestId("textSelectionFormField_value")).toContainHTML(
      "foo"
    );
  });
  it("should show an error message if on submit field is empty", async () => {
    const { findByText, findByLabelText, findByTestId } = renderWithProviders(
      <Formik
        validateOnBlur={true}
        validateOnMount
        validateOnChange
        initialValues={{
          textSelectionFormField_testName: "foo",
        }}
        onSubmit={() => {}}
      >
        <Form>
          <TextSelectionFormField
            errorMessage="test error message"
            label="textSelectionFormField_testLabel"
            name="textSelectionFormField_testName"
          />
          <button type="submit" data-testid="textSelectionFormField_submit">
            test submit
          </button>
        </Form>
      </Formik>
    );
    fireEvent.change(
      await findByLabelText("textSelectionFormField_testLabel"),
      { target: { value: "" } }
    );
    fireEvent.click(await findByTestId("textSelectionFormField_submit"));
    expect(await findByText("test error message")).toBeVisible();
  });
  it("should use a custom validation regexp if given", async () => {
    const screen = renderWithProviders(
      <Formik
        initialValues={{
          textSelectionFormField_testName: "",
        }}
        onSubmit={() => {}}
      >
        <Form>
          <TextSelectionFormField
            errorMessage="test error message"
            validation="^[0-9]$"
            label="textSelectionFormField_testLabel"
            name="textSelectionFormField_testName"
          />
          <button type="submit" data-testid="textSelectionFormField_submit">
            test submit
          </button>
        </Form>
      </Formik>
    );
    await selectTextValue("ciao", screen, "textSelectionFormField_testLabel");
    fireEvent.click(await screen.findByTestId("textSelectionFormField_submit"));
    expect(await screen.findByText("test error message")).toBeVisible();
  });
});

export const selectTextValue = async (
  value: string,
  screen: ReturnType<typeof renderWithProviders>,
  label: string
) => {
  fireEvent.change(await screen.findByLabelText(label), {
    target: { value: value },
  });
};
