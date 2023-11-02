import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "src/redux/provider";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import { Text } from "@appquality/appquality-design-system";
import { usePostUsersMePaymentsMutation } from "src/services/tryberApi";
import * as yup from "yup";

export const FormWrapper: React.FunctionComponent<PaymentModalFormProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [postUsersMePayments] = usePostUsersMePaymentsMutation();
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
    termsAcceptance: yup.boolean().when("step", {
      is: 1,
      then: yup
        .boolean()
        .required(t("This is a required field"))
        .oneOf([true], t("you must accept terms and conditions")),
    }),
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
          .required("This is a required field")
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

    formikHelper.setSubmitting(true);

    try {
      await postUsersMePayments({
        body: {
          method: method,
        },
      }).unwrap();

      formikHelper.setValues({ ...values, step: values.step + 1 });
    } catch (e) {
      dispatch(
        addMessage(
          <Text
            data-qa="modal-payment-error-toastr"
            className="aq-text-primary"
          >
            <strong>{t("Something went wrong")}</strong>
            {t("PAYMENTS_MODAL_INVOICE_STEP_4_ERROR", {
              defaultValue:
                "We were not able to receive your data. Maybe it was a connection problem. Please try again now.",
            })}
          </Text>,
          "danger"
        )
      );
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
