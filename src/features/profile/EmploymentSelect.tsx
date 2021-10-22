import {
  FormGroup,
  FormikField,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import API from "../../utils/api";
import { useEffect, useState } from "react";

export const EmploymentSelect = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const [employments, setEmployments] = useState<SelectType.Option[]>([]);

  useEffect(() => {
    const getEmployments = async () => {
      const results = await API.employments({});
      setEmployments(
        results.map((item) => ({ label: item.name, value: item.id.toString() }))
      );
    };
    getEmployments();
  }, []);

  return (
    <FormikField name={name}>
      {({ field, form }: FieldProps) => (
        <FormGroup>
          <Select
            name={field.name}
            label={label}
            value={field.value}
            options={employments}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              form.setFieldValue(field.name, v, true);
            }}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
