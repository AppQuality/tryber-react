import { useTranslation } from "react-i18next";
import {
  Checkbox,
  FormGroup,
  FormikField,
  Radio,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";

export const PaymentMethod = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <strong>{t("Chose payment method")}</strong>
      </div>
      <FormikField name="paymentMethod" className="aq-mb-3">
        {({ field, form, meta }: FieldProps) => (
          <FormGroup>
            <Radio id={`${field.name}-pp`} name={field.name} label="Paypal" />
            <Radio
              id={`${field.name}-bank`}
              name={field.name}
              label={t("Bank")}
            />
          </FormGroup>
        )}
      </FormikField>
      <FormikField name="termsAcceptance" className="aq-mb-3">
        {({ field, form, meta }: FieldProps) => (
          <FormGroup>
            <Checkbox
              id="termsAcceptance"
              name={field.name}
              label={t("accept conditions and continue request")}
            />
          </FormGroup>
        )}
      </FormikField>
    </div>
  );
};
