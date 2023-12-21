import {
  FieldProps,
  FormLabel,
  FormikField,
  Input,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

const Step0 = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext();
  return (
    <div data-qa="mail-signup-first-step">
      {JSON.stringify(values)}
      <FormikField name="email">
        {({ field }: FieldProps) => (
          <>
            <FormLabel htmlFor="email" label={`${t("Email")} *`} />
            <Input
              extra={{ ...field, "data-qa": "email-input" }}
              value={field.value}
              id="email"
              type="text"
              placeholder="mail@example.com"
            />
          </>
        )}
      </FormikField>
      <FormikField name="password">
        {({ field }: FieldProps) => (
          <>
            <FormLabel htmlFor="email" label={`${t("Password")} *`} />
            <Input
              extra={{ ...field, "data-qa": "password-input" }}
              value={field.value}
              id="email"
              type="password"
              placeholder="sas"
            />
          </>
        )}
      </FormikField>
    </div>
  );
};

export default Step0;
