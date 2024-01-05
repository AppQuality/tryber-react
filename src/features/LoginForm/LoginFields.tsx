import {
  Button,
  ErrorMessage,
  ErrorMessageWrapper,
  FieldProps,
  FormGroup,
  FormLabel,
  FormikField,
  Input,
  Text,
} from "@appquality/appquality-design-system";
import styled from "styled-components";
import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { Link } from "react-router-dom";
import { useFormikContext } from "formik";
import { ButtonWithIcon } from "../ButtonWithIcon";

interface LoginFieldsProps {
  cta: string;
  error: string | boolean;
}

const LoginFields = ({ cta, error }: LoginFieldsProps) => {
  const { isSubmitting, errors } = useFormikContext();
  const { t } = useTranslation();
  const signupRoute = useLocalizeRoute("getting-started/signup");
  useEffect(() => {
    const errorsKeys = Object.keys(errors);
    if (errorsKeys.length > 0 && isSubmitting) {
      const inputElement = document.querySelector(
        `input[name="${errorsKeys[0]}"]`
      ) as HTMLInputElement;
      inputElement?.focus();
    }
  }, [errors, isSubmitting]);
  return (
    <>
      <ButtonWithIcon
        className="aq-mb-3"
        size="block"
        kind="light"
        onClick={() => {
          window.location.href =
            "/wp-admin/admin-ajax.php?loc=&action=facebook_oauth_redirect";
        }}
      >
        <img
          aria-hidden
          alt="login with facebook"
          src="/static/FB.svg"
          className="button-left-img"
        />
        <span className="button-text">{t("Continue with Facebook")}</span>
      </ButtonWithIcon>
      <ButtonWithIcon
        className="aq-mb-3"
        size="block"
        kind="light"
        onClick={() => {
          window.location.href =
            "/wp-admin/admin-ajax.php?loc=&action=linkedin_oauth_redirect";
        }}
      >
        <img
          aria-hidden
          alt="login with linkedin"
          src="/static/LN.svg"
          className="button-left-img"
        />
        <span className="button-text">{t("Continue with LinkedIn")}</span>
      </ButtonWithIcon>
      <Text className="aq-text-center aq-mb-3 aq-text-primary">
        {t("or log in with email and password")}
      </Text>
      <div role="alert" aria-live="polite">
        {error && <ErrorMessageWrapper>{error}</ErrorMessageWrapper>}
      </div>
      <FormikField name="email">
        {({ meta, field }: FieldProps) => (
          <FormGroup>
            <FormLabel
              className="aq-text-left aq-text-primary"
              htmlFor={field.name}
              label={
                <span>
                  {t("Email")} <span aria-hidden>*</span>
                </span>
              }
            />
            <div className="input-group">
              <Input
                id={field.name}
                type="email"
                placeholder="mail@example.com"
                isInvalid={meta.touched && typeof meta.error == "string"}
                extra={{ required: true, ariaRequired: true, ...field }}
              />
            </div>
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      <FormikField name="password">
        {({ meta, field }: FieldProps) => (
          <FormGroup>
            <FormLabel
              className="aq-text-left aq-text-primary"
              htmlFor={field.name}
              label={
                <span>
                  {t("Password")} <span aria-hidden>*</span>
                </span>
              }
            />
            <div className="input-group">
              <Input
                id={field.name}
                type="password"
                placeholder="*****"
                isInvalid={meta.touched && typeof meta.error == "string"}
                extra={{ required: true, ariaRequired: true, ...field }}
                i18n={{
                  showPassword: t("Login input password:::Show password"),
                  hidePassword: t("Login input password:::Hide password"),
                }}
              />
            </div>
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      <Text className="aq-text-right aq-mb-3 capitalize-first">
        <a
          className="aq-text-secondary lost-password-anchor"
          href="/wp-login.php?action=lostpassword"
        >
          {t("forgot your password?")}
        </a>
      </Text>
      <Button
        className="aq-mb-3 capitalize-first"
        kind="primary"
        size="block"
        type="submit"
        formNoValidate
      >
        {isSubmitting ? t("wait...") : cta}
      </Button>
      <div className="aq-mb-3">
        <Text className="aq-text-center aq-text-primary">
          <Trans
            i18nKey="available tags: <strong>, <signuplink>:::LOGIN_SIGNUP_LINK"
            components={{
              strong: <strong className="aq-text-secondary" />,
              signuplink: (
                <Link
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                  }}
                  to={signupRoute}
                />
              ),
            }}
            defaults={`New to TRYBER? <signuplink><strong>Sign up</strong></signuplink>`}
          />
        </Text>
      </div>
    </>
  );
};

export default LoginFields;
