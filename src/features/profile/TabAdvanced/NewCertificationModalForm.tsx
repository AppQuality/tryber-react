import React, { useEffect, useState } from "react";
import {
  Button,
  Datepicker,
  Form,
  FormGroup,
  FormikField,
  FormLabel,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import API from "../../../utils/api";
import { FieldProps } from "formik";
import { CertificationFields } from "../types";
import { useTranslation } from "react-i18next";

const NewCertificationModalForm = ({
  values,
}: {
  values: CertificationFields;
}) => {
  const { t } = useTranslation();
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
    <Form>
      <FormikField name={"institute"}>
        {({ field, form }: FieldProps) => (
          <FormGroup>
            <Select
              menuTargetQuery={"body"}
              name={field.name}
              label={t("Institute")}
              options={institutes}
              value={{
                label: field.value || "",
                value: field.value || "",
              }}
              onChange={(v) => {
                form.setFieldValue(field.name, v.value);
                form.setFieldValue("area", "");
                form.setFieldValue("certificationId", "");
              }}
            />
          </FormGroup>
        )}
      </FormikField>

      <FormikField name={"area"}>
        {({ field, form }: FieldProps) => (
          <FormGroup>
            <Select
              menuTargetQuery={"body"}
              name="area"
              isDisabled={
                !form.values.institute || !form.values.institute.length
              }
              label={t("Area")}
              options={areas}
              value={{
                label: field.value || "",
                value: field.value || "",
              }}
              onChange={(v) => {
                form.setFieldValue(field.name, v.value);
                form.setFieldValue("certificationId", "");
              }}
            />
          </FormGroup>
        )}
      </FormikField>

      <FormikField name={"certificationId"}>
        {({ field, form }: FieldProps) => (
          <FormGroup>
            <Select
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
                form.setFieldValue(field.name, v.value);
              }}
            />
          </FormGroup>
        )}
      </FormikField>
      <FormikField name={"achievementDate"}>
        {({ form, field }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label={t("Achievement Date")} />
            {/*<Datepicker*/}
            {/*  value={initialValue}*/}
            {/*  id={name}*/}
            {/*  locale={i18n.language}*/}
            {/*  maxDate={*/}
            {/*    new Date(now.getFullYear() - 18, now.getMonth(), now.getDate())*/}
            {/*  }*/}
            {/*  placeholder={t("Select your birth date")}*/}
            {/*  setText={t("Set")}*/}
            {/*  cancelText={t("Cancel")}*/}
            {/*  onCancel={onCancel}*/}
            {/*  onChange={(v: { value: Date }) =>*/}
            {/*    onChange(*/}
            {/*      new Date(*/}
            {/*        Date.UTC(*/}
            {/*          v.value.getFullYear(),*/}
            {/*          v.value.getMonth(),*/}
            {/*          v.value.getDate()*/}
            {/*        )*/}
            {/*      )*/}
            {/*    )*/}
            {/*  }*/}
            {/*/>*/}
          </FormGroup>
        )}
      </FormikField>
      <Button type="success" htmlType="submit" flat={true} disabled={false}>
        {t("Add")}
      </Button>
    </Form>
  );
};
export default NewCertificationModalForm;
