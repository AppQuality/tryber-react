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
import styled from "styled-components";

const StyledButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.palette.primary};
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.md}) {
    margin: 0 auto;
  }
  .button-left-img {
    height: 24px;
    width: 24px;
  }
  display: flex;
  align-items: center;
  .button-text {
    text-align: center;
    flex-grow: 1;
  }
`;

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
          <StyledButton
            className="aq-mb-3"
            size="block"
            type="light"
            onClick={() => {
              window.location.href =
                "/wp-admin/admin-ajax.php?loc=&action=facebook_oauth_redirect";
            }}
          >
            <img
              alt="login with facebook"
              src="/static/FB.svg"
              className="button-left-img"
            />
            <span className="button-text">{t("Continue with Facebook")}</span>
          </StyledButton>
          <StyledButton
            className="aq-mb-3"
            size="block"
            type="light"
            onClick={() => {
              window.location.href =
                "/wp-admin/admin-ajax.php?loc=&action=linkedin_oauth_redirect";
            }}
          >
            <img
              alt="login with linkedin"
              src="/static/LN.svg"
              className="button-left-img"
            />
            <span className="button-text">{t("Continue with LinkedIn")}</span>
          </StyledButton>
          <Text className="aq-text-center aq-mb-3">
            {t("or log in with email and password")}
          </Text>

          <Field
            type="email"
            name="email"
            label={
              <div className="aq-text-left">
                {t("Email")}
                <span aria-hidden>*</span>
              </div>
            }
          />
          <Field
            type="password"
            name="password"
            label={
              <div className="aq-text-left">
                {t("Password")}
                <span aria-hidden>*</span>
              </div>
            }
          />
          <Text className="aq-text-center aq-mb-3 capitalize-first">
            <strong>
              <a
                className="aq-text-secondary lost-password-anchor"
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
          >
            {props.isSubmitting ? t("wait...") : cta}
          </Button>
          <div className="aq-mb-3">
            <Text className="aq-text-center">
              <Trans i18nKey="New to TRYBER? <1><strong>Sign up</strong></1>">
                or
                <Link
                  className="aq-text-secondary capitalize-first"
                  style={{ display: "inline-block" }}
                  to={gettingStartedRoute}
                >
                  create an account
                </Link>
              </Trans>
              {/* <Trans
                i18nKey="available tags: <strong>, <signuplink>:::LOGIN_SIGNUP_LINK"
                components={{
                  strong: <strong className="aq-text-primary" />,
                  signuplink: (
                    <Link
                      className="aq-text-secondary"
                      style={{ display: "inline-block" }}
                      to={gettingStartedRoute}
                    />
                  ),
                }}
                defaults={`New to TRYBER? <signuplink><strong>Sign up</strong></signuplink>`}
              /> */}
            </Text>
            {error && (
              <Text className="aq-text-left aq-pt-1" color="danger" small>
                {error}
              </Text>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
