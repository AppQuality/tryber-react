import { Formik } from "@appquality/appquality-design-system";
import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { PaymentFormType } from "./types.d";

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  const initialValues: PaymentFormType = {
    termsAcceptance: false,
    bankaccountOwner: "",
    iban: "",
    step: 0,
  };
  const validationSchema = yup.object({
    termsAcceptance: yup
      .boolean()
      .required(t("This is a required field"))
      .oneOf([true], t("you must accept terms and conditions")),
    bankaccountOwner: yup
      .string()
      .required(t("This is a required field"))
      .matches(/^.+ .+$/gi, t("Insert Name and surname separated by space"))
      .matches(
        /^[A-Za-zÀ-ÖØ-öø-ÿ'-ū.]+ ['A-Za-zÀ-Ö Ø-öø-ÿ-ū.]+$/gi,
        t("The account holder name should contain latin character only")
      ),
    iban: yup
      .string()
      .required("This is a required field")
      .matches(
        /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/g,
        t("This is an invalid format.")
      ),
  });
  const onSubmit = async (
    values: PaymentFormType,
    formikHelper: FormikHelpers<PaymentFormType>
  ) => {
    formikHelper.setSubmitting(true);
    formikHelper.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};

export default FormWrapper;
