import { SelectSelectionFormField } from "./SelectSelectionFormField";
import { MultiSelectionFormField } from "./MultiSelectionFormField";
import { TextSelectionFormField } from "src/pages/PreviewSelectionForm/SelectionForm/SelectionFormFields/TextSelectionFormField";
import { RadioSelectionFormField } from "./RadioSelectionFormField";
import { AddressFields } from "./AddressFields";
import countries from "i18n-iso-countries";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useAppSelector } from "src/store";
import useNotAboveOption from "./useNotAboveOption";
import { useTranslation } from "react-i18next";

interface SelectionFormFieldsProps {
  genderOptions: Option[];
}

export const SelectionFormFields = ({
  genderOptions,
}: SelectionFormFieldsProps) => {
  const { cufList, formData } = useAppSelector(
    (state) => state.previewSelectionForm
  );
  const { t } = useTranslation();
  const notAboveOption = useNotAboveOption();

  const getCufId = (type: string) => parseInt(type.replace("cuf_", ""));

  const getCufType = (type: string) =>
    cufList?.find((cuf) => cuf.id === getCufId(type))?.type;

  const getSelectOptions = (type: string, options?: string[] | number[]) => {
    const selectOptions =
      options?.map((opt) => {
        if (typeof opt === "number") {
          const currentCuf = cufList?.find((cuf) => cuf.id === getCufId(type));
          const option = currentCuf?.options?.find(
            (option) => opt === option.id
          );
          return {
            label: option?.name || "",
            value: option?.id?.toString() || "",
          };
        }
        return { label: opt, value: opt };
      }) || [];
    if (options && typeof options[0] === "number") {
      selectOptions.push(notAboveOption);
    }
    return selectOptions;
  };

  const getRadioOptions = (options?: string[] | number[]) => {
    const radioOptions: string[] = [];
    options?.forEach((opt) => {
      typeof opt === "string" && radioOptions.push(opt);
    });
    return radioOptions;
  };

  const getCountryCode = (value?: any) => {
    if ("country" in value) return countries.getAlpha2Code(value.country, "en");
    return "";
  };

  if (!cufList || cufList.length < 1 || !formData) return null;
  return (
    <>
      {formData.map((field) => {
        const fieldType = field.type.startsWith("cuf_")
          ? getCufType(field.type)
          : field.type;
        switch (fieldType) {
          case "text":
            return (
              <TextSelectionFormField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                validation={field.validation?.regex}
                errorMessage={field.validation?.error}
              />
            );
          case "phone_number":
            return (
              <TextSelectionFormField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                validation={field.validation?.regex}
                errorMessage={t("_FORM_ERROR_MESSAGES_NUMBER-PHONE_", {
                  defaultValue: "This is an invalid format",
                })}
              />
            );
          case "address":
            return (
              <AddressFields
                containerId={`questions.${field.id}`}
                key={field.id}
                label={field.question}
                countryField={`questions.${field.id}.country`}
                cityField={`questions.${field.id}.city`}
                countryCode={getCountryCode(field.value)}
              />
            );
          case "select":
          case "gender":
            return (
              <SelectSelectionFormField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                options={
                  fieldType === "gender"
                    ? genderOptions
                    : "options" in field
                    ? getSelectOptions(field.type, field.options)
                    : []
                }
              />
            );
          case "multiselect":
            return (
              <MultiSelectionFormField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                options={
                  "options" in field
                    ? getSelectOptions(field.type, field.options)
                    : []
                }
              />
            );
          case "radio":
            return (
              <RadioSelectionFormField
                key={field.id}
                name={`questions.${field.id}`}
                label={field.question}
                options={
                  "options" in field ? getRadioOptions(field.options) : []
                }
              />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
};
