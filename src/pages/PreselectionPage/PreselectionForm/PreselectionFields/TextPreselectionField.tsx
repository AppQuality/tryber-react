import {
  ErrorMessage,
  FormGroup,
  FormLabel,
  Input,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";

interface TextPreselectionFieldProps {
  label: string;
  name: string;
  validation?: string;
  errorMessage?: string;
}

export const TextPreselectionField = ({
  label,
  name,
  validation,
  errorMessage,
}: TextPreselectionFieldProps) => {
  const { t } = useTranslation();
  const validate = (value: string) => {
    if (!value) {
      return errorMessage ? errorMessage : t("This is a required field");
    }
    if (validation && !new RegExp(validation).test(value)) {
      return errorMessage ? errorMessage : "This is an invalid format";
    }
  };

  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps) => {
        return (
          <FormGroup className="aq-mb-3">
            {label && <FormLabel htmlFor={name} label={label} />}
            <div className="input-group">
              <Input
                id={name}
                type="text"
                isInvalid={meta.touched && typeof meta.error == "string"}
                extra={{ ...field }}
              />
            </div>
            <ErrorMessage name={name} />
          </FormGroup>
        );
      }}
    </Field>
  );
};
