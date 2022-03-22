import { Formik } from "formik";

export const Form: React.FunctionComponent<PaymentModalFormProps> = ({
  children,
}) => {
  const initialValues = {
    method: "",
    termsAcceptanceCheckbox: "",
    ppAccountOwner: "",
    confirmEmail: "",
    bankaccountOwner: "",
    iban: "",
  };
  const onSubmit = () => {};
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {children}
    </Formik>
  );
};
