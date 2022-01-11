import {
  FormGroup,
  FormikField,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "src/utils/api";

export const EmploymentSelect = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const [employments, setEmployments] = useState<SelectType.Option[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const getEmployments = async () => {
      const results = await API.employments({});
      setEmployments(
        results.map((item) => ({
          label: item.name.toString(),
          value: item.id.toString(),
        }))
      );
    };
    getEmployments();
  }, []);

  return (
    <FormikField name={name}>
      {({ field, form }: FieldProps) => (
        <FormGroup>
          <Select
            placeholder={t("Search")}
            name={field.name}
            label={label}
            value={employments.filter((em) => em.value === field.value)}
            options={employments}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "0" };
              }
              form.setFieldValue(field.name, v.value, true);
            }}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
