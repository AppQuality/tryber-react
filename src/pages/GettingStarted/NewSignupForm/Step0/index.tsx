import {
  Button,
  ErrorMessage,
  FieldProps,
  FormLabel,
  FormikField,
  Input,
  Text,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";

import { Trans, useTranslation } from "react-i18next";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useHeadUsersByEmailByEmailMutation } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import { PasswordRequirements } from "./PasswordRequirements";

const Step0 = () => {
  const login = useLocalizeRoute("login");
  const { t } = useTranslation();
  const { values, errors, validateForm, setFieldValue } =
    useFormikContext<FormValues>();
  const [checkEmail] = useHeadUsersByEmailByEmailMutation();
  const dispatch = useAppDispatch();
  return (
    <div data-qa="mail-signup-first-step">
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
      <PasswordRequirements />
      <Button
        size="block"
        type="primary"
        onClick={() => {
          validateForm();
          checkEmail({ email: values.email }).then((res) => {
            if ("data" in res) {
              dispatch(
                addMessage(
                  <Text
                    data-qa="email-already-exists-toastr"
                    className="aq-text-primary"
                  >
                    <strong>{t("This email is already in use.")}</strong>
                    <p>
                      <Trans
                        i18nKey="Go back and choose another email address or <login_link>log in</login_link>."
                        components={{
                          login_link: <a href={login} />,
                        }}
                      />
                    </p>
                  </Text>,
                  "danger"
                )
              );
            } else {
              if (Object.keys(errors).length) return;
              setFieldValue("step", 1);
            }
          });
        }}
      >
        {t("SIGNUP_STEP:::continue")}
      </Button>
    </div>
  );
};

export default Step0;
