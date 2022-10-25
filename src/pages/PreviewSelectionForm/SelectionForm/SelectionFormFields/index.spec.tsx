import { SelectionFormFields } from "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/index";
import { renderHook } from "@testing-library/react-hooks";
import useGenderOptions from "src/features/UseGenderOptions";
import { renderWithProviders } from "src/utils/test-utils";

jest.mock("formik");
jest.mock(
  "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/AddressFields.tsx",
  () => ({
    AddressFields: () => <div data-testid="AddressFields" />,
  })
);
jest.mock(
  "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/AvailableDevices.tsx",
  () => ({
    AvailableDevices: () => <div data-testid="AvailableDevices" />,
  })
);
jest.mock(
  "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/MultiSelectionFormField.tsx",
  () => ({
    MultiSelectionFormField: () => (
      <div data-testid="MultiSelectionFormField" />
    ),
  })
);
jest.mock(
  "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/RadioSelectionFormField.tsx",
  () => ({
    RadioSelectionFormField: () => (
      <div data-testid="RadioSelectionFormField" />
    ),
  })
);
jest.mock(
  "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/SelectSelectionFormField.tsx",
  () => ({
    SelectSelectionFormField: () => (
      <div data-testid="SelectSelectionFormField" />
    ),
  })
);
jest.mock(
  "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/TextSelectionFormField.tsx"
);

describe("selection form fields", () => {
  it("should not return components if formData is empty or not present", function () {
    const { result } = renderHook(() => useGenderOptions());
    const { queryAllByTestId } = renderWithProviders(
      <SelectionFormFields genderOptions={result.current} />,
      {
        preloadedState: {
          previewSelectionForm: {
            cufList: [],
            showSubmitError: false,
          },
        },
      }
    );
    expect(queryAllByTestId("TextSelectionFormField")).toEqual([]);
  });
  it("should not return components if cufList is empty", function () {
    const { result } = renderHook(() => useGenderOptions());
    const { queryAllByTestId } = renderWithProviders(
      <SelectionFormFields genderOptions={result.current} />,
      {
        preloadedState: {
          previewSelectionForm: {
            cufList: [],
            formData: [
              { id: 91, type: "text", question: "question", value: "val" },
            ],
            showSubmitError: false,
          },
        },
      }
    );
    expect(queryAllByTestId("TextSelectionFormField")).toEqual([]);
  });
  it("should return TextSelectionFormField if a field text is present", function () {
    const { result } = renderHook(() => useGenderOptions());
    const { getByTestId } = renderWithProviders(
      <SelectionFormFields genderOptions={result.current} />,
      {
        preloadedState: {
          previewSelectionForm: {
            cufList: [
              { id: 22, type: "text", name: { it: "Username Telegram" } },
            ],
            formData: [
              { id: 91, type: "text", question: "question", value: "val" },
            ],
            showSubmitError: false,
          },
        },
      }
    );
    expect(getByTestId("TextSelectionFormField")).toBeInTheDocument();
  });
  it("should return TextSelectionFormField if a field phone_number is present", function () {
    const { result } = renderHook(() => useGenderOptions());
    const { getByTestId } = renderWithProviders(
      <SelectionFormFields genderOptions={result.current} />,
      {
        preloadedState: {
          previewSelectionForm: {
            cufList: [
              { id: 22, type: "text", name: { it: "Username Telegram" } },
            ],
            formData: [
              {
                id: 91,
                type: "phone_number",
                question: "question",
                value: "val",
              },
            ],
            showSubmitError: false,
          },
        },
      }
    );
    expect(getByTestId("TextSelectionFormField")).toBeInTheDocument();
  });
  it("should return AddressFields if a field address is present", function () {
    const { result } = renderHook(() => useGenderOptions());
    const { getByTestId } = renderWithProviders(
      <SelectionFormFields genderOptions={result.current} />,
      {
        preloadedState: {
          previewSelectionForm: {
            cufList: [{ id: 1, type: "text", name: { it: "" } }],
            formData: [
              {
                id: 1,
                type: "address",
                question: "",
                value: { country: "", city: "" },
              },
            ],
            showSubmitError: false,
          },
        },
      }
    );
    expect(getByTestId("AddressFields")).toBeInTheDocument();
  });
  it("should return SelectSelectionFormField if a select field is present", function () {
    const { result } = renderHook(() => useGenderOptions());
    const { getByTestId } = renderWithProviders(
      <SelectionFormFields genderOptions={result.current} />,
      {
        preloadedState: {
          previewSelectionForm: {
            cufList: [{ id: 1, type: "text", name: { it: "" } }],
            formData: [{ id: 1, type: "select", question: "", value: "" }],
            showSubmitError: false,
          },
        },
      }
    );
    expect(getByTestId("SelectSelectionFormField")).toBeInTheDocument();
  });
  it("should return SelectSelectionFormField if a gender field is present", function () {
    const { result } = renderHook(() => useGenderOptions());
    const { getByTestId } = renderWithProviders(
      <SelectionFormFields genderOptions={result.current} />,
      {
        preloadedState: {
          previewSelectionForm: {
            cufList: [{ id: 1, type: "text", name: { it: "" } }],
            formData: [{ id: 1, type: "gender", question: "", value: "" }],
            showSubmitError: false,
          },
        },
      }
    );
    expect(getByTestId("SelectSelectionFormField")).toBeInTheDocument();
  });
  it("should return MultiSelectionFormField if a multiselect field is present", function () {
    const { result } = renderHook(() => useGenderOptions());
    const { getByTestId } = renderWithProviders(
      <SelectionFormFields genderOptions={result.current} />,
      {
        preloadedState: {
          previewSelectionForm: {
            cufList: [{ id: 1, type: "text", name: { it: "" } }],
            formData: [{ id: 1, type: "multiselect", question: "", value: "" }],
            showSubmitError: false,
          },
        },
      }
    );
    expect(getByTestId("MultiSelectionFormField")).toBeInTheDocument();
  });
  it("should return RadioSelectionFormField if a radio field is present", function () {
    const { result } = renderHook(() => useGenderOptions());
    const { getByTestId } = renderWithProviders(
      <SelectionFormFields genderOptions={result.current} />,
      {
        preloadedState: {
          previewSelectionForm: {
            cufList: [{ id: 1, type: "text", name: { it: "" } }],
            formData: [{ id: 1, type: "radio", question: "", value: "" }],
            showSubmitError: false,
          },
        },
      }
    );
    expect(getByTestId("RadioSelectionFormField")).toBeInTheDocument();
  });
});
