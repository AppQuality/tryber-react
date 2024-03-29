import { Text } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";

import { Trans, useTranslation } from "react-i18next";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useHeadUsersByEmailByEmailMutation } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";

const useNextStep = () => {
  const login = useLocalizeRoute("login");
  const { values, validateForm, setFieldValue, setFieldTouched } =
    useFormikContext<FormValues>();
  const [checkEmail] = useHeadUsersByEmailByEmailMutation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return () => {
    setFieldTouched("email");
    setFieldTouched("password");
    validateForm().then((errors) => {
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
              "danger",
              false
            )
          );
        } else {
          if (Object.keys(errors).length) {
            const inputElement = document.querySelector(
              `input[name="${Object.keys(errors)[0]}"]`
            ) as HTMLInputElement;
            inputElement?.focus();
            return;
          }
          setFieldValue("step", 1);
        }
      });
    });
  };
};

export { useNextStep };
