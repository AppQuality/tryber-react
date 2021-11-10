import {
  FormGroup,
  FormikField,
  Select,
  SelectType,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import API from "../../utils/api";
import { useEffect, useState } from "react";

export const EducationSelect = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const [educationLevels, setEducation] = useState<SelectType.Option[]>([]);

  useEffect(() => {
    const getEmployments = async () => {
      const results = await API.educationLevels({});
      setEducation(
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
            value={educationLevels.filter((ed) => ed.value === field.value)}
            options={educationLevels}
            onBlur={() => {
              form.setFieldTouched(field.name);
            }}
            onChange={(v) => {
              if (v === null) {
                v = { label: "", value: "" };
              }
              form.setFieldValue(field.name, v.value, true);
            }}
          />
        </FormGroup>
      )}
    </FormikField>
  );
};
