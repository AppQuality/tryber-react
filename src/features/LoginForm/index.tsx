import * as yup from "yup";
import WPAPI from "src/utils/wpapi";
import {
  Button,
  Field,
  Form,
  Formik,
  Text,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { Link } from "react-router-dom";

const LoginForm = ({
  className,
  onRegisterLinkClick,
}: {
  className: string;
  onRegisterLinkClick?: () => void;
}) => {
  const { t } = useTranslation();
  const gettingStartedRoute = useLocalizeRoute("getting-started");

  const [error, setError] = useState<string | boolean>(false);
  const [cta, setCta] = useState<string>(t("login"));
  return (
    <Formik
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
          window.location.reload();
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
            window.location.reload();
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
      {(props) => (
        <Form className={className}>
          <div className="aq-mb-3">
            <Text className="aq-text-center">
              <div className="capitalize-first aq-text-primary">
                <strong>{t("login with your credentials")}</strong>
              </div>
              <div>
                <Trans i18nKey="or <1>create an account</1>">
                  or
                  <Link
                    className="aq-text-secondary capitalize-first"
                    style={{ display: "inline-block" }}
                    to={gettingStartedRoute}
                    onClick={
                      onRegisterLinkClick ? onRegisterLinkClick : undefined
                    }
                  >
                    create an account
                  </Link>
                </Trans>
              </div>
            </Text>
            {error && (
              <Text className="aq-text-left aq-pt-1" color="danger" small>
                {error}
              </Text>
            )}
          </div>
          <Field type="email" name="email" label={t("Email")} />
          <Field type="password" name="password" label={t("Password")} />
          <Text className="aq-text-center aq-mb-3 capitalize-first">
            <strong>
              <a
                className="aq-text-secondary"
                href="/wp-login.php?action=lostpassword"
              >
                {t("forgot your password?")}
              </a>
            </strong>
          </Text>
          <Button
            className="aq-mb-3 capitalize-first"
            kind="primary"
            size="block"
            flat
            type="submit"
            disabled={props.isSubmitting || !props.dirty || !props.isValid}
          >
            {props.isSubmitting ? t("wait...") : cta}
          </Button>
          <Text className="capitalize-first aq-text-center aq-mb-3">
            {t("or login with")}
          </Text>
          <div className="login-social aq-text-center">
            <div
              className="aq-mx-2"
              onClick={() => {
                window.location.href =
                  "/wp-admin/admin-ajax.php?loc=&action=linkedin_oauth_redirect";
              }}
            >
              <img alt="login with linkedin" src="/static/linkedin-logo.svg" />
            </div>
            <div
              className="aq-mx-2"
              onClick={() => {
                window.location.href =
                  "/wp-admin/admin-ajax.php?loc=&action=facebook_oauth_redirect";
              }}
            >
              <img alt="login with facebook" src="/static/facebook-logo.svg" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
