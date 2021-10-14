import {
  Checkbox,
  Field,
  Button,
  Text,
  Title,
  CSSGrid,
  Formik,
  FormikField,
  FieldProps,
  ErrorMessage,
  Form,
  FormGroup,
} from "@appquality/appquality-design-system";
import CountrySelect from "./CountrySelect";
import BirthdayPicker from "./BirthdayPicker";
import * as yup from "yup";
import { useTranslation, Trans } from "react-i18next";
import referralStore from "../redux/referral";
import siteWideMessageStore from "../redux/siteWideMessages";
import API from "../utils/api";
import WPAPI from "../utils/wpapi";

interface SignupFormProps {
  redirectUrl: string;
  formId?: string;
}

export const SignupForm = ({
  redirectUrl,
  formId = "signupForm",
}: SignupFormProps) => {
  const { referral } = referralStore();
  const { add } = siteWideMessageStore();
  const { t } = useTranslation();

  const initialValues = {
    name: "",
    surname: "",
    email: "",
    country: "",
    birthDate: "",
    password: "",
    subscribe: "",
    referral: referral || "",
  };
  const validationSchema = {
    name: yup.string().required(t("This is a required field")),
    surname: yup.string().required(t("This is a required field")),
    email: yup
      .string()
      .email(t("Email must be a valid email"))
      .required(t("This is a required field")),
    country: yup.string().required(t("This is a required field")),
    birthDate: yup.string().required(t("This is a required field")),
    password: yup
      .string()
      .min(6, t("Must be at least 6 character long"))
      .matches(/[0-9]/, t("Must contain at least a number"))
      .matches(/[A-Z]/, t("Must contain at least an uppercase letter"))
      .matches(/[a-z]/, t("Must contain at least a lowercase letter"))
      .required(t("This is a required field")),
    subscribe: yup
      .boolean()
      .oneOf([true], t("This is a required field"))
      .required(t("This is a required field")),
    referral: yup.string(),
  };
  return (
    <Formik
      enableReinitialize
      onSubmit={async (values, actions) => {
        const data = {
          name: values.name,
          surname: values.surname,
          password: values.password,
          birthDate: values.birthDate,
          country: values.country,
          email: values.email,
          referral: values.referral,
        };
        API.signup(data)
          .then(() => {
            WPAPI.getNonce()
              .then((nonce) => {
                WPAPI.login({
                  username: values.email,
                  password: values.password,
                  security: nonce,
                })
                  .then(() => {
                    window.location.href = redirectUrl;
                  })
                  .catch((e) => alert(e.message));
              })
              .catch((e) => alert(e.message));
          })
          .catch((e) => {
            if (e.message.includes("already registered")) {
              add({
                message: t("Email {{email}} already registered", {
                  email: values.email,
                }),
                type: "danger",
              });
            }
          })
          .finally(() => actions.setSubmitting(false));
      }}
      validationSchema={yup.object(validationSchema)}
      initialValues={initialValues}
      initialStatus={{ id: formId }}
    >
      {(props) => (
        <Form id="signupForm">
          <Title className="aq-mb-2" size="xs" as="h5">
            {t("Create an account")}
          </Title>
          <Field type="text" name="name" label={t("Name")} />
          <Field type="text" name="surname" label={t("Surname")} />
          <Field type="email" name="email" label={t("Email")} />
          <CountrySelect name="country" label={t("Country")} />
          <FormikField name="birthDate">
            {({
              field, // { name, value, onChange, onBlur }
              form,
              meta,
            }: FieldProps) => {
              return (
                <FormGroup
                  className={meta.error && meta.touched ? "is-invalid" : ""}
                >
                  <BirthdayPicker
                    name="birthDate"
                    initialValue={field.value}
                    onCancel={() => form.setFieldTouched("birthDate")}
                    onChange={(v: Date) => {
                      field.onChange(v.toISOString().slice(0, 10));
                      form.setFieldValue(
                        "birthDate",
                        v.toISOString().slice(0, 10),
                        true
                      );
                    }}
                  />
                  <ErrorMessage name="birthDate" />
                </FormGroup>
              );
            }}
          </FormikField>
          <Field type="password" name="password" label={t("Password")} />
          <Text small className="aq-mb-3">
            {t(
              "The password must be at least 6 characters long, contain an uppercase letter, a lowercase letter and a number."
            )}
          </Text>
          {referral && (
            <Field type="text" name="referral" label={t("Referral")} disabled />
          )}

          <FormikField name={"subscribe"}>
            {({
              field: { name, onChange, onBlur, value }, // { name, value, onChange, onBlur }
              form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }: FieldProps) => {
              return (
                <>
                  <Checkbox
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    isInvalid={meta.touched && !!meta.error}
                    label={t(
                      "I agree to receive earning opportunity emails from AppQuality"
                    )}
                  />
                  <ErrorMessage name={name} />
                </>
              );
            }}
          </FormikField>

          <CSSGrid min="78px" fill={true}>
            <Button
              className="aq-mb-3"
              style={{ gridColumn: "auto / span 3" }}
              type="success"
              size="block"
              htmlType="submit"
              id="signup-simple"
              flat
              disabled={props.isSubmitting || !props.dirty || !props.isValid}
            >
              {props.isSubmitting ? t("wait...") : t("Signup now")}
            </Button>
          </CSSGrid>
          <Text small>
            <Trans i18nKey="By clicking this button, you accept the <1>Terms</1> and <3>Privacy Policy</3>">
              By clicking this button, you accept the
              <a
                target="_blank"
                href={t("/terms-and-conditions/")}
                rel="noreferrer"
              >
                Terms
              </a>
              and
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={t("https://www.iubenda.com/privacy-policy/7934311")}
              >
                Privacy Policy
              </a>
            </Trans>
          </Text>
        </Form>
      )}
    </Formik>
  );
};
