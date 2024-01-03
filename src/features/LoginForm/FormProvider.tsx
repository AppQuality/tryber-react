import { Formik, Text } from "@appquality/appquality-design-system";
import * as yup from "yup";
import WPAPI from "src/utils/wpapi";
import { useTranslation } from "react-i18next";
import getValidRedirect from "../getValidRedirect";
import siteWideMessageStore from "src/redux/siteWideMessages";

interface FormProps {
  children: React.ReactNode;
  setCta: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string | boolean>>;
}

const FormProvider = ({ children, setCta, setError }: FormProps) => {
  const { t } = useTranslation();
  const { add } = siteWideMessageStore();
  return (
    <Formik
      validateOnBlur={false}
      onSubmit={async (values, actions) => {
        setError(false);
        try {
          const nonce = await WPAPI.getNonce();
          await WPAPI.login({
            username: values.email,
            password: values.password,
            security: nonce,
          });
          setCta(`${t("redirecting")}...`);

          const url = new URL(window.location.href);
          const queryParams = new URLSearchParams(url.search);
          if (queryParams && getValidRedirect(queryParams).length) {
            window.location.href = queryParams.get("redirectTo") as string;
          } else window.location.reload();
        } catch (e: unknown) {
          const { message } = e as Error;
          const error = JSON.parse(message);
          if (error.type === "invalid") {
            setError(`${t("Wrong username or password.")}`);
          } else if (error.type === "tfa") {
            setError(
              `${t(
                "You need to set your two-factor authentication for this. Redirecting to the login page"
              )}`
            );
            window.location.href = "/wp-login.php";
          } else {
            add({
              message: (
                <Text className="aq-text-primary">
                  <strong>{t("Something went wrong")}</strong>
                  <p>{t("try again to login")}</p>
                </Text>
              ),
              type: "danger",
            });
          }
        }
        actions.setSubmitting(false);
      }}
      validationSchema={yup.object({
        email: yup
          .string()
          .email(t("Email must be a valid email"))
          .required(t("This is a required field")),
        password: yup.string().required(t("This is a required field")),
      })}
      initialValues={{
        email: "",
        password: "",
      }}
    >
      {children}
    </Formik>
  );
};

export default FormProvider;
