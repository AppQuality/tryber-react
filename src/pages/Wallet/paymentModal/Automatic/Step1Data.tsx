import { useTranslation } from "react-i18next";
import { Field } from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";

export const Step1Data = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext<PaymentFormType>();
  return (
    <>
      {values.paymentMethod === "paypal" ? (
        <div>
          <Field
            name="ppAccountOwner"
            type="email"
            label={t("Email")}
            placeholder="email@example.com"
          />
          <Field
            name="confirmEmail"
            type="email"
            label={t("Confirm email")}
            placeholder="email@example.com"
          />
        </div>
      ) : (
        <div>
          <Field
            name="bankaccountOwner"
            type="text"
            label={t("Account Holder")}
            placeholder={t("name")}
          />
          <Field
            name="iban"
            type="text"
            label={t("IBAN")}
            placeholder="OT2T26635625325382772"
          />
        </div>
      )}
    </>
  );
};
