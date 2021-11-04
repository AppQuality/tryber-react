import { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  FormikField,
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
  const [current, setCurrent] = useState<CertificationFields>({
    institute: "",
    area: "",
    certificationId: "",
  });

  useEffect(() => {
    const getInstitutes = async () => {
      let results = await API.certifications({});
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
      let filterBy = current.institute
        ? { filterBy: { institute: current.institute } }
        : {};
      let results = await API.certifications(filterBy);
      let areas = results
        .map((item) => item.area)
        .filter((v, i, a) => a.indexOf(v) === i);
      setAreas(areas.map((item) => ({ label: item, value: item })));
    };
    getAreas();
  }, [institutes]);
  useEffect(() => {
    const getCertifications = async () => {
      let filterBy =
        current.institute && current.area
          ? { filterBy: { institute: current.institute, area: current.area } }
          : {};
      let results = await API.certifications(filterBy);
      setCertifications(
        results.map((item) => ({ label: item.name, value: item.id.toString() }))
      );
    };
    getCertifications();
  }, [institutes, areas]);

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
                setCurrent({
                  institute: v.value ? v.value.toString() : "",
                  area: "",
                  certificationId: "",
                });
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
                form.values.area = v.value;
                form.setFieldValue("certificationId", "");
                setCurrent({
                  institute: current.institute,
                  area: v.value ? v.value.toString() : "",
                  certificationId: "",
                });
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
                setCurrent({
                  institute: current.institute,
                  area: current.area,
                  certificationId: v.value ? v.value.toString() : "",
                });
              }}
            />
          </FormGroup>
        )}
      </FormikField>
      <button type="submit">submmit NOW</button>
    </Form>
  );
};
export default NewCertificationModalForm;
