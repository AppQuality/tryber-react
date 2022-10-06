import { useMapFormDataToInitialValues } from "src/pages/PreviewSelectionForm/SelectionForm/mapFormDataToInitialValues/index";
import { renderHook } from "@testing-library/react-hooks";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("map form data to initial values", () => {
  it("should be a function", () => {
    expect(typeof useMapFormDataToInitialValues).toBe("function");
  });
  it("should return empty values if cuflist is not passed as argument", () => {
    const { result } = renderHook(() =>
      useMapFormDataToInitialValues([
        { id: 91, type: "text", question: "come ti chiami?" },
      ])
    );
    expect(result.current).toEqual({
      device: [],
      questions: {},
    });
  });
  it("should return empty values if formData is not passed as argument", () => {
    const { result } = renderHook(() =>
      useMapFormDataToInitialValues(undefined, [
        {
          id: 22,
          type: "text",
          name: {
            it: "Username Telegram",
          },
        },
      ])
    );
    expect(result.current).toEqual({
      device: [],
      questions: {},
    });
  });
  it("should return a question object with field ids as keys if a value is present", () => {
    const { result } = renderHook(() =>
      useMapFormDataToInitialValues(
        [{ id: 91, type: "text", question: "question", value: "val" }],
        [
          {
            id: 22,
            type: "text",
            name: {
              it: "Username Telegram",
            },
          },
        ]
      )
    );
    expect(result.current).toEqual({
      device: [],
      questions: {
        91: "val",
      },
    });
  });
  it("should return empty string if field.value is not present", () => {
    const { result } = renderHook(() =>
      useMapFormDataToInitialValues(
        [{ id: 91, type: "text", question: "question" }],
        [
          {
            id: 22,
            type: "text",
            name: {
              it: "Username Telegram",
            },
          },
        ]
      )
    );
    expect(result.current).toEqual({
      device: [],
      questions: {
        91: "",
      },
    });
  });
  it("should return a stringified value if it is a number", function () {
    const { result } = renderHook(() =>
      useMapFormDataToInitialValues(
        [{ id: 91, type: "text", question: "question", value: 1 }],
        [
          {
            id: 22,
            type: "text",
            name: {
              it: "Username Telegram",
            },
          },
        ]
      )
    );
    expect(result.current).toEqual({
      device: [],
      questions: {
        91: "1",
      },
    });
  });
  it("should return the value if value is a string and type is not gender", function () {
    const { result } = renderHook(() =>
      useMapFormDataToInitialValues(
        [{ id: 91, type: "text", question: "question", value: "val" }],
        [
          {
            id: 22,
            type: "text",
            name: {
              it: "Username Telegram",
            },
          },
        ]
      )
    );
    expect(result.current).toEqual({
      device: [],
      questions: {
        91: "val",
      },
    });
  });
  it("should return a gender option if value is a string and type is gender", function () {
    const { result } = renderHook(() =>
      useMapFormDataToInitialValues(
        [
          {
            id: 91,
            type: "gender",
            question: "question",
            value: "not-specified",
          },
        ],
        [
          {
            id: 22,
            type: "text",
            name: {
              it: "Username Telegram",
            },
          },
        ]
      )
    );
    expect(result.current).toEqual({
      device: [],
      questions: {
        91: { value: "not-specified", label: "Gender option:::Not Specified" },
      },
    });
  });
  it("should return a city country object if value is an address", function () {
    const { result } = renderHook(() =>
      useMapFormDataToInitialValues(
        [
          {
            id: 91,
            type: "gender",
            question: "question",
            value: { city: "Milan", country: "Italy" },
          },
        ],
        [
          {
            id: 22,
            type: "text",
            name: {
              it: "Username Telegram",
            },
          },
        ]
      )
    );
    expect(result.current).toEqual({
      device: [],
      questions: {
        91: { city: "Milan", country: "Italy" },
      },
    });
  });

  it("should map the value to the corresponding cuf options if field.value is an array", function () {
    const { result } = renderHook(() =>
      useMapFormDataToInitialValues(
        [{ id: 14, type: "cuf_14", question: "question", value: [228] }],
        [
          {
            id: 14,
            type: "select",
            allow_other: false,
            name: {
              it: "Fascia di reddito",
            },
            options: [
              {
                id: 228,
                name: "da 0€ a 25.000€ annui",
              },
              {
                id: 229,
                name: "da 25.000€ a 50.000€ annui",
              },
              {
                id: 230,
                name: "da 50.000€ a 75.000€ annui",
              },
              {
                id: 231,
                name: "più di 75.000€ annui",
              },
            ],
          },
        ]
      )
    );
    expect(result.current).toEqual({
      device: [],
      questions: {
        14: [
          {
            value: "228",
            label: "da 0€ a 25.000€ annui",
          },
        ],
      },
    });
  });
});
