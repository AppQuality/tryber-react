import { FieldProps, useFormikContext } from "formik";
import { Trans, useTranslation } from "react-i18next";
import { SignupFormType } from "../FormProvider";

import {
  Checkbox,
  ErrorMessage,
  FormGroup,
  FormLabel,
  FormikField,
  Input,
  Text,
  Title,
  Button,
} from "@appquality/appquality-design-system";
import CountrySelect from "src/features/CountrySelect";
import styled from "styled-components";
import BirthdayInput from "./BirthdayInput";
import { useEffect } from "react";

const ButtonWrapper = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
    flex-direction: row;
  }
`;
const Step1 = () => {
  const { t } = useTranslation();
  const { setFieldValue, submitForm, isSubmitting, errors } =
    useFormikContext<SignupFormType>();
  const onBackClick = () => {
    setFieldValue("step", 0);
  };
  const onSubmitClick = () => {
    submitForm();
  };
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
    <div data-qa="mail-signup-second-step">
      <Title size="s" className="aq-mb-2">
        {t("Complete your profile")}
      </Title>
      <Text small className="aq-mb-4">
        {t("Fields marked with asterisk (*) are required.")}
      </Text>
      <FormikField name="name">
        {({ meta, field }: FieldProps) => (
          <FormGroup>
            <FormLabel
              htmlFor={field.name}
              label={
                <span>
                  {t("Name")} <span aria-hidden>*</span>
                </span>
              }
            />
            <div className="input-group">
              <Input
                id={field.name}
                type="text"
                placeholder="Mario"
                isInvalid={meta.touched && typeof meta.error == "string"}
                extra={{
                  ...field,
                  required: true,
                  "aria-required": true,
                  "data-qa": "input-name",
                  "aria-invalid": meta.touched && typeof meta.error == "string",
                  "aria-errormessage": `${field.name}-error`,
                }}
              />
            </div>
            <ErrorMessage id={`${field.name}-error`} name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      <FormikField name="surname">
        {({ meta, field }: FieldProps) => (
          <FormGroup>
            <FormLabel
              htmlFor={field.name}
              label={
                <span>
                  {t("Surname")} <span aria-hidden>*</span>
                </span>
              }
            />
            <div className="input-group">
              <Input
                id={field.name}
                type="text"
                placeholder="Rossi"
                onChange={field.onChange}
                isInvalid={meta.touched && typeof meta.error == "string"}
                extra={{
                  ...field,
                  required: true,
                  "aria-required": true,
                  "data-qa": "input-surname",
                  "aria-invalid": meta.touched && typeof meta.error == "string",
                  "aria-errormessage": `${field.name}-error`,
                }}
              />
            </div>
            <ErrorMessage id={`${field.name}-error`} name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      <BirthdayInput />
      <CountrySelect name="country" label={t("COUNTRY:::Signup form Step1")} />
      <FormikField name={"termsAcceptance"}>
        {({
          field: { name, onChange, onBlur, value }, // { name, value, onChange, onBlur }
          meta,
        }: FieldProps) => {
          return (
            <div
              className="aq-mb-3"
              data-tracking="signup-agree-to-receive-email"
            >
              <Checkbox
                name={name}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isInvalid={meta.touched && typeof meta.error == "string"}
                label={
                  <span>
                    {t(
                      "SIGNUP_FORM:::I agree to receive earning opportunity emails from AppQuality"
                    )}{" "}
                    <span aria-hidden>*</span>
                  </span>
                }
              />
              <ErrorMessage id={`${name}-error`} name={name} />
            </div>
          );
        }}
      </FormikField>
      <Text className="aq-mb-3 aq-text-primary">
        <Trans
          i18nKey={"MAIL_SIGNUP_TERMS_DISCLAIMER"}
          components={{
            terms_link: (
              <a
                data-qa="terms-and-conditions"
                href={t("/terms-and-conditions/", {
                  ns: "links",
                })}
                target="_blank"
                data-tracking="terms-condictions-link"
              />
            ),
            privacy_link: (
              <a
                data-qa="privacy-policy"
                href={t("/privacy-policy/", {
                  ns: "links",
                })}
                target="_blank"
                data-tracking="privacy-policy-link"
              />
            ),
            ethical_link: (
              <a
                data-qa="ethical-code"
                href={t("/ethical-code/", {
                  ns: "links",
                })}
                target="_blank"
                data-tracking="ethical-code-link"
              />
            ),
          }}
          defaults="By signing up, you also accept the the <terms_link>Terms</terms_link>, <privacy_link>Privacy Policy</privacy_link> and <ethical_link>Ethical Code</ethical_link> of tryber.me"
        />
      </Text>
      <ButtonWrapper>
        <Button
          size="block"
          flat
          onClick={onBackClick}
          data-tracking="signup-back-cta"
        >
          {t("SIGNUP_STEP:::back")}
        </Button>
        <Button
          size="block"
          type="submit"
          disabled={isSubmitting}
          onClick={onSubmitClick}
          data-tracking="signup-submit-cta"
        >
          {t("SIGNUP_STEP:::submit")}
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default Step1;
