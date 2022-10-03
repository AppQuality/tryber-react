import {
  ErrorMessage,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";

interface SelectSelectionFormFieldProps {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
}

export const SelectSelectionFormField = ({
  name,
  label,
  options,
  placeholder,
}: SelectSelectionFormFieldProps) => {
  const { t } = useTranslation();
  return (
    <div className="aq-mb-3">
      <Field
        name={name}
        validate={(option: Option) => {
          if (!option.value) {
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
                value={field.value}
                options={options}
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
                  form.setFieldValue(name, v, true);
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
