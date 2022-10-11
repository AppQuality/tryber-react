import {
  ErrorMessage,
  FormGroup,
  FormLabel,
  Input,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";
import { useTranslation } from "react-i18next";

interface TextSelectionFormFieldProps {
  label: string;
  name: string;
  validation?: string;
  errorMessage?: string;
}

export const TextSelectionFormField = ({
  label,
  name,
  validation,
  errorMessage,
}: TextSelectionFormFieldProps) => {
  const { t } = useTranslation();
  const validate = (value: string) => {
    if (!value) {
      return errorMessage ? errorMessage : t("This is a required field");
    }
    if (validation && !new RegExp(validation).test(value)) {
      return errorMessage
        ? errorMessage
        : t("_FORM_ERROR_MESSAGES_NUMBER-PHONE_", {
            defaultValue: "This is an invalid format",
          });
    }
  };

  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps) => {
        return (
          <FormGroup className="aq-mb-3">
            <FormLabel htmlFor={name} label={label} />
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
