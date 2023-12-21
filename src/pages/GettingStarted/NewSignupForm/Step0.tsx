import {
  Button,
  ErrorMessage,
  FieldProps,
  FormLabel,
  FormikField,
  Input,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

const Step0 = () => {
  const { t } = useTranslation();
  const { values, errors, validateForm, setFieldValue } = useFormikContext();
  return (
    <div data-qa="mail-signup-first-step">
      {JSON.stringify(values)}
      {JSON.stringify(errors)}
      <FormikField name="email">
        {({ field }: FieldProps) => (
          <>
            <FormLabel htmlFor={field.name} label={`${t("Email")} *`} />
            <Input
              extra={{ ...field, "data-qa": "email-input" }}
              value={field.value}
              id={field.name}
              type="text"
              placeholder="mail@example.com"
            />
            <ErrorMessage name={field.name} />
          </>
        )}
      </FormikField>
      <FormikField name="password">
        {({ field }: FieldProps) => (
          <>
            <FormLabel htmlFor={field.name} label={`${t("Password")} *`} />
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
      <Button
        size="block"
        type="primary"
        onClick={() => {
          validateForm();
          if (Object.keys(errors).length) return;
          setFieldValue("step", 1);
        }}
      >
        {t("SIGNUP_STEP:::continue")}
      </Button>
    </div>
  );
};

export default Step0;
