import {
  ErrorMessage,
  FieldProps,
  FormLabel,
  FormikField,
  Input,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

const PasswordInput = () => {
  const { t } = useTranslation();
  return (
    <FormikField name="password">
      {({ field }: FieldProps) => (
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
            extra={{ ...field, "data-qa": "password-input" }}
            value={field.value}
            id={field.name}
            type="password"
            placeholder="********"
          />
          <ErrorMessage name={field.name} />
        </>
      )}
    </FormikField>
  );
};

export { PasswordInput };
