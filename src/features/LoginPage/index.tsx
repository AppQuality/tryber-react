import {
  Button,
  Card,
  Field,
  Form,
  Formik,
  Text,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useLocalizeRoute } from "../../hooks/useLocalizedRoute";
import WPAPI from "../../utils/wpapi";
import { StyledLoginCard } from "./_style";
import { useAppDispatch } from "src/store";
import { setIsLoginPage } from "./loginPageSlice";

export const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | boolean>(false);
  const [cta, setCta] = useState<string>(t("login"));
  const history = useHistory();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = {
    email: yup
      .string()
      .email(t("Email must be a valid email"))
      .required(t("This is a required field")),
    password: yup.string().required(t("This is a required field")),
  };

  const handleloginLn = () => {
    const redirectUrl = history.location.pathname;
    window.location.href = `/wp-admin/admin-ajax.php?loc=${redirectUrl}&action=linkedin_oauth_redirect`;
  };

  const handleloginFb = () => {
    const redirectUrl = history.location.pathname;
    window.location.href = `/wp-admin/admin-ajax.php?loc=${redirectUrl}&action=facebook_oauth_redirect`;
  };

  const gettingStartedRoute = useLocalizeRoute("getting-started");

  useEffect(() => {
    dispatch(setIsLoginPage(true));
    return () => {
      dispatch(setIsLoginPage(false));
    };
  }, []);

  return (
    <StyledLoginCard>
      <Card className="login-card" title={t("Login")}>
        <div className="card-body">
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
                } else {
                  window.location.reload();
                }
              }
              actions.setSubmitting(false);
            }}
            validationSchema={yup.object(validationSchema)}
            initialValues={initialValues}
          >
            {(props) => (
              <Form className="card-login-form">
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
                  type="primary"
                  size="block"
                  flat
                  htmlType="submit"
                  disabled={
                    props.isSubmitting || !props.dirty || !props.isValid
                  }
                >
                  {props.isSubmitting ? t("wait...") : cta}
                </Button>
                <Text className="capitalize-first aq-text-center aq-mb-3">
                  {t("or login with")}
                </Text>
                <div className="login-social aq-text-center">
                  <div className="aq-mx-2" onClick={handleloginLn}>
                    <img
                      alt="login with linkedin"
                      src="/static/linkedin-logo.svg"
                    />
                  </div>
                  <div className="aq-mx-2" onClick={handleloginFb}>
                    <img
                      alt="login with facebook"
                      src="/static/facebook-logo.svg"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </StyledLoginCard>
  );
};
