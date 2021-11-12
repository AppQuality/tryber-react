import { useEffect, useState } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { AdvancedFormValues, CertificationsRadio } from "./types";
import { FormikValues } from "formik";

export const MapCufValues = () => {
  const {
    additional,
    certifications,
    profession,
    education,
    customUserFields,
  } = useSelector(
    (state: GeneralState) => ({
      additional: state.user.user?.additional,
      certifications: state.user.user?.certifications,
      profession: state.user.user?.profession,
      education: state.user.user?.education,
      customUserFields: state.user.customUserFields,
    }),
    shallowEqual
  );
  const { t } = useTranslation();
  let initialCertRadioValue: CertificationsRadio = "";
  if (typeof certifications === "boolean") {
    initialCertRadioValue = certifications ? "true" : "false";
  }
  if (typeof certifications?.length) {
    initialCertRadioValue = "true";
  }
  const [initialUserValues, setInitialUserValues] =
    useState<AdvancedFormValues>({
      certificationsRadio: initialCertRadioValue,
      certifications: certifications || [],
      employment: profession
        ? { label: profession.name, value: profession.id.toString() }
        : { label: "", value: "" },
      education: education
        ? { label: education.name, value: education.id.toString() }
        : { label: "", value: "" },
    });
  const [validationSchema, setValidationSchema] = useState<{
    [key: string]: yup.AnySchema;
  }>({
    employment: yup.string().required(t("This is a required field")),
    education: yup.string().required(t("This is a required field")),
  });
  useEffect(() => {
    let schema: { [key: string]: yup.AnySchema } = {};
    let values: { [key: string]: string | object | object[] } = {};
    values.certifications = certifications || [];
    values.education = education
      ? education.id.toString()
      : { label: "", value: "" };
    values.employment = profession
      ? profession.id.toString()
      : { label: "", value: "" };
    if (customUserFields) {
      customUserFields.forEach((group) => {
        console.log(group);
      });
    }
    customUserFields?.forEach((group) => {
      if (group.fields)
        group.fields.forEach((field) => {
          switch (field.type) {
            case "multiselect":
              const multiselectValue = additional?.filter(
                (cuf: ApiComponents["schemas"]["AdditionalField"]) =>
                  cuf.field_id === field.id
              );
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
              const selectValue = additional?.find(
                (cuf: UserData["additional"][0]) => cuf.field_id === field.id
              );
              schema["cuf_" + field.id] = yup.object();
              values["cuf_" + field.id] = selectValue
                ? {
                    ...selectValue,
                    label: selectValue.text,
                  }
                : { label: "", value: "" };
              break;
            case "text":
              const textValue = additional?.find(
                (cuf: UserData["additional"][0]) => cuf.field_id === field.id
              );
              values["cuf_" + field.id] = textValue ? textValue.value : "";
              const formatData = field.format ? field.format.split(";") : false;
              const format = formatData ? new RegExp(formatData[0]) : false;
              const formatMessage =
                formatData && formatData.length > 1
                  ? formatData[1]
                  : t("Invalid format");
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
      // case: text { id: 1, values: {value:'suca'}}
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
