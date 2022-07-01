import {
  FormGroup,
  FormLabel,
  Input,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";

export const TextAdditionalField = ({
  label,
  name,
  validation,
  errorMessage,
}: {
  label: string;
  name: string;
  validation: string;
  errorMessage: string;
}) => {
  const { t } = useTranslation();
  const validate = (value: string) => {
    if (!value) {
      return t("This is a required field");
    }
    if (!new RegExp(validation).test(value)) {
      return errorMessage ? errorMessage : t("This is an invalid format");
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
