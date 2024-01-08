import { FieldProps, useFormikContext } from "formik";
import { Trans, useTranslation } from "react-i18next";
import { SignupFormType } from "../FormProvider";
import { parse, isDate, isValid } from "date-fns";
import {
  Checkbox,
  ErrorMessage,
  FormGroup,
  FormLabel,
  FormikField,
  Input,
  Text,
  Title,
  DateInput,
  Button,
} from "@appquality/appquality-design-system";
import CountrySelect from "src/features/CountrySelect";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
    flex-direction: row;
  }
`;
const Step1 = () => {
  const { t, i18n } = useTranslation();
  const { setFieldValue } = useFormikContext<SignupFormType>();
  const now = new Date();
  const maxDate = new Date(
    Date.UTC(now.getFullYear() - 18, now.getMonth(), now.getDate())
  );
  function validateDateString(value: string) {
    let error;
    const parsedDate = isDate(value)
      ? value
      : parse(value, "dd/MM/yyyy", new Date());

    if (!isValid(parsedDate)) {
      error = t("Invalid date");
    }
    return error;
  }
  const onBackClick = () => {
    setFieldValue("step", 0);
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
                extra={{ required: true, ...field }}
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
                extra={{ required: true, ...field }}
              />
            </div>
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      <FormikField name="birthdate" validate={validateDateString}>
        {({ meta, field, form }: FieldProps) => (
          <FormGroup>
            <FormLabel
              htmlFor={field.name}
              label={
                <span>
                  {t("DATE_OF_BIRTH:::SignupFrom Step1")}{" "}
                  <span aria-hidden>*</span>
                </span>
              }
            />
            <div className="input-group">
              <DateInput
                id={field.name}
                name={field.name}
                value={field.value}
                maxDate={maxDate}
                i18n={{
                  locale: i18n.language,
                  dateFormat: "DD/MM/YYYY",
                  placeholder: "29/11/1991",
                  setText: t("Set"),
                  cancelText: t("Cancel"),
                  buttonTitle: t("Select your birth date"),
                }}
                onCancel={() => form.setFieldTouched(field.name)}
                onChange={(event) => {
                  field.onChange(event.target.value);
                  form.setFieldValue(field.name, event.target.value, true);
                }}
                inputProps={{
                  required: true,
                  onBlur: () => form.setFieldTouched(field.name),
                }}
              />
            </div>
            <ErrorMessage name={field.name} />
          </FormGroup>
        )}
      </FormikField>
      <CountrySelect name="country" label={t("COUNTRY:::Signup form Step1")} />
      <FormikField name={"subscribe"}>
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
        <Button size="block" type="submit">
          {t("SIGNUP_STEP:::submit")}
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default Step1;
