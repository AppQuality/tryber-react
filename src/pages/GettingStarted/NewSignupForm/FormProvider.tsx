import { Formik, FormikHelpers } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import referralStore from "src/redux/referral";
import { Text } from "@appquality/appquality-design-system";
import * as yup from "yup";
import siteWideMessageStore from "src/redux/siteWideMessages";
import { usePostUsersMutation } from "src/services/tryberApi";
import WPAPI from "src/utils/wpapi";
import { useHistory } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";

interface FormProviderProps {
  children: React.ReactNode;
}

export type SignupFormType = {
  step: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  birthdate: string;
  country: string;
  termsAcceptance: boolean;
  referral: string;
};

const FormProvider = ({ children }: FormProviderProps) => {
  const { referral } = referralStore();
  const [postUsers] = usePostUsersMutation();
  let history = useHistory();
  const successUrl = useLocalizeRoute("getting-started/confirmation");
  const { t } = useTranslation();
  const { add } = siteWideMessageStore();
  // const dispatch = useAppDispatch();
  const initialValues: SignupFormType = {
    step: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    birthdate: "",
    country: "",
    termsAcceptance: false,
    referral: referral || "",
  };
  const validationSchema = {
    email: yup
      .string()
      .required(t("This is a required field"))
      .email(t("Email must be a valid email")),
    password: yup
      .string()
      .min(6, t("Must be at least 6 character long"))
      .matches(/[0-9]/, t("Must contain at least a number"))
      .matches(/[A-Z]/, t("Must contain at least an uppercase letter"))
      .matches(/[a-z]/, t("Must contain at least a lowercase letter"))
      .required(t("This is a required field")),
    name: yup.string().when("step", {
      is: 1,
      then: yup.string().required(t("This is a required field")),
    }),
    surname: yup.string().when("step", {
      is: 1,
      then: yup.string().required(t("This is a required field")),
    }),
    birthdate: yup.string().when("step", {
      is: 1,
      then: yup.string().required(t("This is a required field")),
    }),
    country: yup.string().when("step", {
      is: 1,
      then: yup.string().required(t("This is a required field")),
    }),
    termsAcceptance: yup.boolean().when("step", {
      is: 1,
      then: yup
        .boolean()
        .required(t("This is a required field"))
        .oneOf([true], t("you must accept terms and conditions")),
    }),
    referral: yup.string(),
  };
  const onSubmit = async (
    values: SignupFormType,
    formikHelper: FormikHelpers<SignupFormType>
  ) => {
    formikHelper.setSubmitting(true);
    try {
      // post
      await postUsers({
        body: {
          email: values.email,
          password: values.password,
          name: values.name,
          surname: values.surname,
          birthDate: values.birthdate,
          country: values.country,
          referral: values.referral,
        },
      });
      const nonce = await WPAPI.getNonce();
      await WPAPI.login({
        username: values.email,
        password: values.password,
        security: nonce,
      });
      history.push(successUrl);
    } catch (error) {
      const e = error as any;
      // dispatch error message
      if ("message" in e && e.message.includes("already registered")) {
        add({
          message: t("Email {{email}} already registered", {
            email: values.email,
          }),
          type: "danger",
        });
      } else {
        add({
          message: (
            <Text className="aq-text-primary">
              <strong>{t("Something went wrong")}</strong>
              <p>{t("Click on “Sign up” and try again.")}</p>
            </Text>
          ),
          type: "danger",
        });
      }
    } finally {
      formikHelper.setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={onSubmit}
    >
      {children}
    </Formik>
  );
};

export default FormProvider;
