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
  const { setFieldValue, errors, submitForm } =
    useFormikContext<SignupFormType>();
  const onBackClick = () => {
    setFieldValue("step", 0);
  };
  const onSubmitClick = () => {
    submitForm();
  };
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
                }}
              />
            </div>
            <ErrorMessage name={field.name} />
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
                }}
              />
            </div>
            <ErrorMessage name={field.name} />
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
            <div className="aq-mb-3">
              <Checkbox
                name={name}
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                isInvalid={meta.touched && !!meta.error}
                label={
                  <span>
                    {t(
                      "I agree to receive earning opportunity emails from AppQuality"
                    )}{" "}
                    <span aria-hidden>*</span>
                  </span>
                }
              />
              <ErrorMessage name={name} />
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
                href={t("/terms-and-conditions/")}
                target="_blank"
              />
            ),
            privacy_link: (
              <a
                data-qa="privacy-policy"
                href={t("https://www.iubenda.com/privacy-policy/7934311")}
                target="_blank"
              />
            ),
            ethical_link: (
              <a
                data-qa="ethical-code"
                href={t("/ethical-code/")}
                target="_blank"
              />
            ),
          }}
          defaults="By signing up, you also accept the the <terms_link>Terms</terms_link>, <privacy_link>Privacy Policy</privacy_link> and <ethical_link>Ethical Code</ethical_link> of tryber.me"
        />
      </Text>
      <ButtonWrapper>
        <Button size="block" flat onClick={onBackClick}>
          {t("SIGNUP_STEP:::back")}
        </Button>
        {Object.keys(errors).map((e) => (
          <Text key={e} className="aq-mb-3 aq-text-danger">
            {errors[e as keyof SignupFormType]}
          </Text>
        ))}
        <Button size="block" type="submit" onClick={onSubmitClick}>
          {t("SIGNUP_STEP:::submit")}
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default Step1;
