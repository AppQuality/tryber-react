import {
  Datepicker,
  ErrorMessage,
  Form,
  FormGroup,
  FormikField,
  FormLabel,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "src/utils/api";
import { CertificationFields } from "../types";

const NewCertificationModalForm = ({
  values,
}: {
  values: CertificationFields;
}) => {
  const { t, i18n } = useTranslation();
  const [institutes, setInstitutes] = useState<SelectType.Option[]>([]);
  const [areas, setAreas] = useState<SelectType.Option[]>([]);
  const [certifications, setCertifications] = useState<SelectType.Option[]>([]);

  useEffect(() => {
    const getInstitutes = async () => {
      let results = await API.getCertifications({});
      //get only institutes
      let institutes = results
        .map((item) => item.institute)
        //filter unique values
        .filter((v, i, a) => a.indexOf(v) === i);
      setInstitutes(institutes.map((item) => ({ label: item, value: item })));
    };
    getInstitutes();
  }, []);

  useEffect(() => {
    const getAreas = async () => {
      let filterBy = values.institute
        ? { filterBy: { institute: values.institute } }
        : {};
      let results = await API.getCertifications(filterBy);
      let areas = results
        .map((item) => item.area)
        .filter((v, i, a) => a.indexOf(v) === i);
      setAreas(areas.map((item) => ({ label: item, value: item })));
    };
    getAreas();
  }, [values.institute]);
  useEffect(() => {
    const getCertifications = async () => {
      let filterBy =
        values.institute && values.area
          ? { filterBy: { institute: values.institute, area: values.area } }
          : {};
      let results = await API.getCertifications(filterBy);
      setCertifications(
        results.map((item) => ({ label: item.name, value: item.id.toString() }))
      );
    };
    getCertifications();
  }, [values.area]);

  return (
    <Form id="newCertificationForm">
      <FormikField name={"institute"}>
        {({ field, form }: FieldProps) => (
          <FormGroup>
            <Select
              placeholder={t("Search")}
              menuTargetQuery={"body"}
              name={field.name}
              label={t("Institute")}
              options={institutes}
              value={{
                label: field.value || "",
                value: field.value || "",
              }}
              onChange={(v) => {
                if (!v) {
                  form.setFieldValue(field.name, "");
                  form.setFieldValue("area", "");
                  form.setFieldValue("certificationId", "");
                } else {
                  form.setFieldValue(field.name, v.value);
                  form.setFieldValue("area", "");
                  form.setFieldValue("certificationId", "");
                }
              }}
            />
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>

      <FormikField name={"area"}>
        {({ field, form }: FieldProps) => (
          <FormGroup>
            <Select
              placeholder={t("Search")}
              menuTargetQuery={"body"}
              name="area"
              isDisabled={
                !form.values.institute || !form.values.institute.length
              }
              label={t("Add new certification:::Area")}
              options={areas}
              value={{
                label: field.value || "",
                value: field.value || "",
              }}
              onChange={(v) => {
                if (!v) {
                  form.setFieldValue(field.name, "");
                  form.setFieldValue("certificationId", "");
                } else {
                  form.setFieldValue(field.name, v.value);
                  form.setFieldValue("certificationId", "");
                }
              }}
            />
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>

      <FormikField name={"certificationId"}>
        {({ field, form }: FieldProps) => (
          <FormGroup>
            <Select
              placeholder={t("Search")}
              isDisabled={!form.values.area || !form.values.area.length}
              menuTargetQuery={"body"}
              name="certificationId"
              label={t("Certification")}
              options={certifications}
              value={{
                label: field.value || "",
                value: field.value || "",
              }}
              onChange={(v) => {
                if (!v) {
                  form.setFieldValue(field.name, "");
                } else {
                  form.setFieldValue(field.name, v.value || "");
                }
              }}
            />
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      <FormikField name={"achievementDate"}>
        {({ form, field }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label={t("Achievement Date")} />
            <Datepicker
              value={field.value}
              id={field.name}
              locale={i18n.language}
              maxDate={new Date()}
              minDate={new Date("1/2/1970")}
              placeholder={t("Select achievement date")}
              setText={t("Set")}
              cancelText={t("Cancel")}
              onCancel={() => form.setFieldTouched(field.name)}
              onChange={(v: { value: Date | null }) => {
                if (!v.value) return;
                const date = new Date(
                  Date.UTC(
                    v.value.getFullYear(),
                    v.value.getMonth(),
                    v.value.getDate()
                  )
                );
                field.onChange(date.toISOString().slice(0, 10));
                form.setFieldValue(
                  field.name,
                  date.toISOString().slice(0, 10),
                  true
                );
              }}
            />
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
    </Form>
  );
};
export default NewCertificationModalForm;
