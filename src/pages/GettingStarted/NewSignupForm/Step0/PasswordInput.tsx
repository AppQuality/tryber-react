import {
  ErrorMessage,
  FieldProps,
  FormLabel,
  FormikField,
  Input,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const PasswordInput = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <FormikField name="password">
        {({ field, meta }: FieldProps) => (
          <>
            <FormLabel
              htmlFor={field.name}
              label={
                <span>
                  {t("Password")} <span aria-hidden>*</span>
                </span>
              }
            />{" "}
            <Input
              extra={{
                ...field,
                "data-qa": "password-input",
                "aria-required": true,
                "aria-invalid": meta.touched && typeof meta.error == "string",
                "aria-errormessage": `${field.name}-error`,
              }}
              value={field.value}
              isInvalid={meta.touched && typeof meta.error == "string"}
              id={field.name}
              type="password"
              placeholder="********"
            />
            <ErrorMessage id={`${field.name}-error`} name={field.name} />
          </>
        )}
      </FormikField>
    </div>
  );
};

export { PasswordInput };
