import {
  Checkbox,
  Field,
  Button,
  Paragraph,
  SmallTitle,
  CSSGrid,
  Formik,
  FormikField,
  FieldProps,
  ErrorMessage,
  Form,
  SelectType,
  FormGroup,
} from "@appquality/appquality-design-system";
import CountrySelect from "./CountrySelect";
import BirthdayPicker from "./BirthdayPicker";
import * as yup from "yup";
import { useTranslation, Trans } from "react-i18next";
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
  const { t } = useTranslation();
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    country: "",
    birthDate: "",
    password: "",
    subscribe: "",
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
  };
  return (
    <Formik
      onSubmit={async (values, actions) => {
        const data = {
          name: values.name,
          surname: values.surname,
          password: values.password,
          birthDate: values.birthDate,
          country: values.country,
          email: values.email,
        };
        API.signup(data)
          .then((res) => {
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
          .catch((e) => alert(e.message))
          .finally(() => actions.setSubmitting(false));
      }}
      validationSchema={yup.object(validationSchema)}
      initialValues={initialValues}
      initialStatus={{ id: formId }}
    >
      {(props) => (
        <Form id="signupForm">
          <SmallTitle as="h5">{t("Create an account")}</SmallTitle>
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
                    onCancel={({ value }: { value: Date }) =>
                      form.setFieldTouched("birthDate")
                    }
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
          <Paragraph small className="aq-mb-3">
            {t(
              "The password must be at least 6 characters long, contain an uppercase letter, a lowercase letter and a number."
            )}
          </Paragraph>
          <Checkbox
            name="subscribe"
            label={t(
              "I agree to receive earning opportunity emails from AppQuality"
            )}
          />
          <CSSGrid min="78px" fill={true}>
            <Button
              className="aq-mb-3"
              style={{ gridColumn: "auto / span 3" }}
              type="success"
              size="block"
              htmlType="submit"
              flat
              disabled={props.isSubmitting || !props.dirty || !props.isValid}
            >
              {props.isSubmitting ? t("wait...") : t("Signup now")}
            </Button>
          </CSSGrid>
          <Paragraph small>
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
          </Paragraph>
        </Form>
      )}
    </Formik>
  );
};
