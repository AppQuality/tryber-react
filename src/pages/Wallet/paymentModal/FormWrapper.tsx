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
        .email(t("Email must be a valid email")),
    }),
    bankaccountOwner: yup.string().required(t("This is a required field")),
    iban: yup
      .string()
      .matches(
        /^\+?((\d\-|\d)+\d){4,20}$/gi,
        t(
          "This is an invalid format. Should be formatted as +11000000000 or 0011000000000"
        )
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
