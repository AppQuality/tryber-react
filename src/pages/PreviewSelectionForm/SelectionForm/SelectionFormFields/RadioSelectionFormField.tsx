import {
  ErrorMessage,
  FormGroup,
  FormLabel,
  Radio,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";

interface RadioSelectionFormFieldProps {
  label: string;
  name: string;
  options: string[];
}

export const RadioSelectionFormField = ({
  label,
  name,
  options,
}: RadioSelectionFormFieldProps) => {
  const { t } = useTranslation();

  return (
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
          <FormGroup className="aq-mb-3">
            <FormLabel htmlFor={name} label={label} />
            {options.map((o) => (
              <Radio
                key={`${field.name}-${o}`}
                id={`${field.name}-${o}`}
                name={field.name}
                value={o}
                checked={field.value === o}
                onChange={(v) => {
                  field.onChange(v);
                  form.setFieldValue(field.name, v);
                }}
                label={o}
              />
            ))}
            <ErrorMessage name={name} />
          </FormGroup>
        );
      }}
    </Field>
  );
};
