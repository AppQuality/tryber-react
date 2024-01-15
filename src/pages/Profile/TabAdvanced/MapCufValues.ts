import { FormikValues } from "formik";
import i18n from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetCustomUserFieldsQuery,
  useGetUsersMeQuery,
} from "src/services/tryberApi";
import * as yup from "yup";
import { AdvancedFormValues } from "./types";

export const MapCufValues = () => {
  const { data } = useGetUsersMeQuery({ fields: "all" });
  const { data: customUserFields } = useGetCustomUserFieldsQuery();
  const { additional, profession, education } = data || {};
  const { t } = useTranslation();
  const [initialUserValues, setInitialUserValues] =
    useState<AdvancedFormValues>({
      employment: profession?.id.toString() || "0",
      education: education?.id.toString() || "0",
    });
  const [validationSchema, setValidationSchema] = useState<{
    [key: string]: yup.AnySchema;
  }>({
    employment: yup.string(),
    education: yup.string(),
  });
  useEffect(() => {
    let schema: { [key: string]: yup.AnySchema } = {};
    let values: { [key: string]: string | object | object[] } = {};
    values.education = education ? education.id.toString() : "0";
    values.employment = profession ? profession.id.toString() : "0";
    customUserFields?.forEach((group) => {
      if (group.fields)
        group.fields.forEach((field) => {
          switch (field.type) {
            case "multiselect":
              const multiselectValue = additional
                ? additional.filter(
                    (cuf: ApiComponents["schemas"]["AdditionalField"]) =>
                      cuf.field_id === field.id
                  )
                : [];
              const mappedOptions: SelectOptionType[] = multiselectValue.map(
                (val: ApiComponents["schemas"]["AdditionalField"]) => ({
                  ...val,
                  label: val.text || "",
                })
              );
              schema["cuf_" + field.id] = yup.array(yup.object());
              values["cuf_" + field.id] = mappedOptions;
              break;
            case "select":
              const selectValue = additional
                ? additional.find(
                    (cuf: UserData["additional"][0]) =>
                      cuf.field_id === field.id
                  )
                : [];
              schema["cuf_" + field.id] = yup.object();
              values["cuf_" + field.id] =
                selectValue && "value" in selectValue
                  ? {
                      ...selectValue,
                      label: selectValue.text,
                    }
                  : { label: "", value: "" };
              break;
            case "text":
              const textValue = additional
                ? additional.find(
                    (cuf: UserData["additional"][0]) =>
                      cuf.field_id === field.id
                  )
                : [];
              values["cuf_" + field.id] =
                textValue && "value" in textValue ? textValue.value : "";
              const formatData = field.format ? field.format.split(";") : false;
              const format = formatData ? new RegExp(formatData[0]) : false;
              const lang = (i18n.language as SupportedLanguages) || "it";
              // apl = available Placeholder Langs
              const apl = Object.keys(field.placeholder || {});
              let placeholder = "";
              if (!apl.includes(lang) && field.placeholder) {
                placeholder = field.placeholder.it || "";
              } else if (apl.includes(lang) && field.placeholder) {
                placeholder = field.placeholder[lang] || "";
              } else {
                placeholder = "";
              }
              const formatMessage =
                formatData && formatData.length > 1
                  ? formatData[1]
                  : t(
                      "Invalid format. Please use the correct format. " +
                        placeholder
                    );
              schema["cuf_" + field.id] = format
                ? yup.string().matches(format, formatMessage)
                : yup.string();
              break;
          }
        });
    });
    setInitialUserValues({ ...initialUserValues, ...values });
    setValidationSchema({ ...validationSchema, ...schema });
  }, [customUserFields]);
  return {
    initialUserValues: initialUserValues,
    validationSchema: validationSchema,
  };
};
export const PrepareUserCuf = (values: FormikValues) => {
  const cufToSave: {
    id: string;
    values: ApiOperations["put-users-me-additionals-fieldId"]["requestBody"]["content"]["application/json"];
  }[] = [];
  Object.keys(values).forEach((key) => {
    //key == cuf_n, certifications, certificationRadio, education, employment
    if (key.includes("cuf_")) {
      if (typeof values[key] === "string") {
        cufToSave.push({
          id: key.split("_")[1].toString(),
          values: { value: values[key] },
        });
      }
      //case: multiselect
      else if (Array.isArray(values[key])) {
        let fieldMultiselect: {
          id: string;
          values: { value: string; is_candidate?: boolean }[];
        };
        fieldMultiselect = { id: "", values: [] };
        fieldMultiselect.id = key.split("_")[1].toString();
        values[key].forEach((multiSelectOption: any) => {
          multiSelectOption.hasOwnProperty("is_candidate")
            ? fieldMultiselect.values.push({
                value: multiSelectOption.value,
                is_candidate: multiSelectOption.is_candidate,
              })
            : fieldMultiselect.values.push({
                value: multiSelectOption.value,
              });
        });
        cufToSave.push(fieldMultiselect);
      } else {
        // case: select
        let fieldSelect: {
          id: string;
          values: { value: string; is_candidate?: boolean };
        };
        fieldSelect = { id: "", values: { value: "" } };
        fieldSelect.id = key.split("_")[1].toString();
        values[key].hasOwnProperty("is_candidate")
          ? (fieldSelect.values = {
              value: values[key].value,
              is_candidate: values[key].is_candidate,
            })
          : (fieldSelect.values = {
              value: values[key].value,
            });
        cufToSave.push(fieldSelect);
      }
    }
  });
  return cufToSave;
};
