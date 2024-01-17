import {
  ErrorMessage,
  FieldProps,
  FormLabel,
  FormikField,
  Input,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const EmailInput = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <FormikField name="email">
        {({ field, meta }: FieldProps) => (
          <>
            <FormLabel
              htmlFor={field.name}
              label={
                <span>
                  {t("Email")} <span aria-hidden>*</span>
                </span>
              }
            />
            <Input
              extra={{
                ...field,
                "data-qa": "email-input",
                "aria-required": true,
                "aria-invalid": meta.touched && typeof meta.error == "string",
                "aria-errormessage": `${field.name}-error`,
              }}
              isInvalid={meta.touched && typeof meta.error == "string"}
              value={field.value}
              id={field.name}
              type="text"
              placeholder="mail@example.com"
            />
            <ErrorMessage id={`${field.name}-error`} name={field.name} />
          </>
        )}
      </FormikField>
    </div>
  );
};

export { EmailInput };
