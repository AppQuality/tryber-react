import {
  ErrorMessage,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface SelectPreselectionFieldProps {
  name: string;
  label?: string;
  options: string[];
  placeholder?: string;
}

export const SelectPreselectionField = ({
  name,
  label,
  options,
  placeholder,
}: SelectPreselectionFieldProps) => {
  const { t } = useTranslation();
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
            return t("This is a required field");
          }
        }}
      >
        {({ field, form }: FieldProps) => {
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
                placeholder={placeholder || "Choose value"}
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
