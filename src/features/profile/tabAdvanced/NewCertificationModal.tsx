import {
  FormGroup,
  Formik,
  FormikField,
  Select,
  SelectType,
  Form,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import API from "../../../utils/api";
import { useEffect, useState } from "react";
import { FieldProps, FormikProps } from "formik";
import { CertificationFields } from "../types";

export const NewCertificationModal = () => {
  const { t } = useTranslation();
  const [institutes, setInstitutes] = useState<SelectType.Option[]>([]);
  const [areas, setAreas] = useState<SelectType.Option[]>([]);
  const [certifications, setCertifications] = useState<SelectType.Option[]>([]);
  // const { add } = siteWideMessages();

  // function onlyUnique(value: any, index: number, self: any) {
  //   return self.indexOf(value) === index;
  // }

  useEffect(() => {
    const getInstitutes = async () => {
      let results = await API.certifications();
      let institutes = results
        .map((item) => item.institute)
        .filter((v, i, a) => a.indexOf(v) === i);
      setInstitutes(institutes.map((item) => ({ label: item, value: item })));
    };
    getInstitutes();
  }, []);
  useEffect(() => {
    const getAreas = async () => {
      let results = await API.certifications();
      let areas = results
        .map((item) => item.area)
        .filter((v, i, a) => a.indexOf(v) === i);
      setAreas(areas.map((item) => ({ label: item, value: item })));
    };
    getAreas();
  }, [institutes]);
  useEffect(() => {
    const getCertifications = async () => {
      let results = await API.certifications();
      setCertifications(
        results.map((item) => ({ label: item.name, value: item.id.toString() }))
      );
    };
    getCertifications();
  }, [institutes, areas]);

  // const

  return (
    <Formik
      initialValues={{ institute: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formikProps: FormikProps<CertificationFields>) => {
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
                    label={t("Area")}
                    options={areas}
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

            <FormikField name={"certification"}>
              {({ field, form }: FieldProps) => (
                <FormGroup>
                  <Select
                    menuTargetQuery={"body"}
                    name="certification"
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
            <button type="submit">submmittaa</button>
          </Form>
        );
      }}
    </Formik>
  );
};
