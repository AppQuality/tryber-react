import { Formik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const FormWrapper: React.FunctionComponent<PaymentModalFormProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const initialValues: PaymentFormType = {
    paymentMethod: "",
    termsAcceptance: false,
    ppAccountOwner: "",
    confirmEmail: "",
    bankaccountOwner: "",
    iban: "",
  };
  const validationSchema = {
    paymentMethod: yup
      .string()
      .required(t("This is a required field"))
      .oneOf(["paypal", "bank"]),
    termsAcceptance: yup.boolean().required(t("This is a required field")),
    ppAccountOwner: yup.string().when("paymentMethod", {
      is: "paypal",
      then: yup
        .string()
        .required(t("This is a required field"))
        .email(t("Email must be a valid email")),
    }),
    confirmEmail: yup.string().when("paymentMethod", {
      is: "paypal",
      then: yup
        .string()
        .required(t("This is a required field"))
        .email(t("Email must be a valid email"))
        .oneOf([yup.ref("ppAccountOwner")]),
    }),
    bankaccountOwner: yup.string().when("paymentMethod", {
      is: "bank",
      then: yup.string().required(t("This is a required field")),
    }),
    iban: yup
      .string()
      .matches(
        /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/gi,
        t("This is an invalid format.")
      ),
  };

  const onSubmit = () => {};
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
