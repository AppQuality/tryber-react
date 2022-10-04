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
                placeholder={
                  placeholder || t("Select placeholder:::Choose value")
                }
                menuTargetQuery="body"
                noOptionsMessage={() => t("__SELECT_DEFAULT_NO_OPTION")}
                onChange={(v) => {
                  if (v === null) {
                    v = { label: "", value: "" };
                  }
                  field.onChange(v.value);
                  form.setFieldValue(name, v, true);
                }}
                isClearable
              />
              <ErrorMessage name={name} />
            </FormGroup>
          );
        }}
      </Field>
    </div>
  );
};
