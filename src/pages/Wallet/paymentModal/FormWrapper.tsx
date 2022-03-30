import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/redux/provider";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import {
  fetchPaymentRequests,
  setPaymentModalOpen,
} from "src/redux/wallet/actionCreator";
import API from "src/utils/api";
import * as yup from "yup";

export const FormWrapper: React.FunctionComponent<PaymentModalFormProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const initialValues: PaymentFormType = {
    step: 0,
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
    termsAcceptance: yup
      .boolean()
      .required(t("This is a required field"))
      .oneOf([true], t("you must accept terms and conditions")),
    ppAccountOwner: yup.string().when("step", {
      is: 1,
      then: yup.string().when("paymentMethod", {
        is: "paypal",
        then: yup
          .string()
          .required(t("This is a required field"))
          .email(t("Email must be a valid email")),
      }),
    }),
    confirmEmail: yup.string().when("step", {
      is: 1,
      then: yup.string().when("paymentMethod", {
        is: "paypal",
        then: yup
          .string()
          .required(t("This is a required field"))
          .email(t("Email must be a valid email"))
          .oneOf([yup.ref("ppAccountOwner")], t("email must be the same")),
      }),
    }),
    bankaccountOwner: yup.string().when("step", {
      is: 1,
      then: yup.string().when("paymentMethod", {
        is: "bank",
        then: yup
          .string()
          .required(t("This is a required field"))
          .matches(/^.+ .+$/gi, t("Insert Name and surname separated by space"))
          .matches(
            /^[A-Za-zÀ-ÖØ-öø-ÿ'-ū.]+ ['A-Za-zÀ-Ö Ø-öø-ÿ-ū.]+$/gi,
            t("The account holder name should contain latin character only")
          ),
      }),
    }),
    iban: yup.string().when("step", {
      is: 1,
      then: yup.string().when("paymentMethod", {
        is: "bank",
        then: yup
          .string()
          .required()
          .matches(
            /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/g,
            t("This is an invalid format.")
          ),
      }),
    }),
  };
  const onSubmit = async (
    values: PaymentFormType,
    formikHelper: FormikHelpers<PaymentFormType>
  ) => {
    formikHelper.setSubmitting(true);
    const method: ApiOperations["post-users-me-payments"]["requestBody"]["content"]["application/json"]["method"] =
      values.paymentMethod === "paypal"
        ? { type: "paypal", email: values.ppAccountOwner }
        : {
            type: "iban",
            accountHolderName: values.bankaccountOwner,
            iban: values.iban,
          };
    try {
      const results = await API.postPaymentRequest({
        method: method,
      });
      formikHelper.setFieldValue("step", 3);
      dispatch(fetchPaymentRequests());
    } catch (e) {
      const err = e as HttpError;
      formikHelper.resetForm();
      dispatch(setPaymentModalOpen(false));
      dispatch(addMessage(err.message || err.statusCode, "danger", false));
    }
    formikHelper.setSubmitting(false);
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
