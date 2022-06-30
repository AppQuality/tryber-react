import {
  Select,
  ErrorMessage,
  FormGroup,
} from "@appquality/appquality-design-system";

import { Field, FieldProps } from "formik";
import { useMemo } from "react";
export const SelectAdditionalField = ({
  label,
  options,
  name,
}: {
  label: string;
  options: string[];
  name: string;
}) => {
  const selectOptions = useMemo(
    () =>
      options.map((option) => ({
        label: option,
        value: option,
      })),
    [options]
  );
  return (
    <div className="aq-mb-3">
      <Field
        name={name}
        validate={(value: string) => {
          if (!value) {
            return "Required";
          }
        }}
      >
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: FieldProps) => {
          return (
            <FormGroup>
              <Select
                key={name}
                name={name}
                value={selectOptions.filter((o) => o.value === field.value)}
                options={selectOptions}
                onBlur={() => {
                  form.setFieldTouched(name);
                }}
                label={label}
                placeholder={"Choose value"}
                menuTargetQuery="body"
                noOptionsMessage={() => "No options"}
                onChange={(v) => {
                  if (v === null) {
                    v = { label: "", value: "" };
                  }
                  field.onChange(v.value);
                  form.setFieldValue(name, v.value, true);
                }}
              />
              <ErrorMessage name={name} />
            </FormGroup>
          );
        }}
      </Field>
    </div>
  );
};
