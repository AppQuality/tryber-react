import { useEffect, useState } from "react";
import API from "../../../utils/api";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { operations } from "../../../utils/schema";
import { shallowEqual, useSelector } from "react-redux";
import { AdvancedFormValues, CertificationsRadio } from "./types";

export const MapCufValues = () => {
  const {
    additional,
    certifications,
    profession,
    education,
  }: {
    additional: UserData["additional"];
    certifications: UserData["certifications"];
    profession: UserData["profession"];
    education: UserData["education"];
  } = useSelector(
    (state: GeneralState) => ({
      additional: state.user.user?.additional,
      certifications: state.user.user?.certifications,
      profession: state.user.user?.profession,
      education: state.user.user?.education,
    }),
    shallowEqual
  );
  const { t } = useTranslation();
  const [cufGroups, setCufGroups] = useState<
    operations["get-customUserFields"]["responses"]["200"]["content"]["application/json"]
  >([]);
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
    const getCUF = async () => {
      try {
        const groups = await API.customUserFields({});
        setCufGroups(groups);
      } catch (e) {
        alert(e);
      }
    };
    getCUF();
  }, []);
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
    cufGroups.forEach((group) => {
      if (group.fields)
        group.fields.forEach((field) => {
          switch (field.type) {
            case "multiselect":
              const multiselectValue = additional?.filter(
                (cuf: UserData["additional"][0]) => cuf.field_id === field.id
              );
              schema["cuf_" + field.id] = yup.array(yup.object());
              values["cuf_" + field.id] = multiselectValue
                ? multiselectValue
                : [];
              break;
            case "select":
              const selectValue = additional.find(
                (cuf: UserData["additional"][0]) => cuf.field_id === field.id
              );
              schema["cuf_" + field.id] = yup.object();
              values["cuf_" + field.id] = selectValue ? selectValue : {};
              break;
            case "text":
              const textValue = additional.find(
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
  }, [cufGroups]);
  return {
    cufGroups: cufGroups,
    initialUserValues: initialUserValues,
    validationSchema: validationSchema,
  };
};
