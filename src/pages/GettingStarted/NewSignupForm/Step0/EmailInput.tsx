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
        {({ field }: FieldProps) => (
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
              }}
              value={field.value}
              id={field.name}
              type="text"
              placeholder="mail@example.com"
            />
            <ErrorMessage name={field.name} />
          </>
        )}
      </FormikField>
    </div>
  );
};

export { EmailInput };
