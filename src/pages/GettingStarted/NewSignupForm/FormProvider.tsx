import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
// import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import referralStore from "src/redux/referral";
import * as yup from "yup";
// import { Text } from '@appquality/appquality-design-system';

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
  const { t } = useTranslation();
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
      alert(JSON.stringify(values, null, 2));
    } catch (e) {
      // dispatch error message
      console.error(e);
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
