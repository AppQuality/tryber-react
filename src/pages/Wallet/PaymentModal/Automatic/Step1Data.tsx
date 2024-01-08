import { Trans, useTranslation } from "react-i18next";
import {
  Field,
  FormGroup,
  Checkbox,
  FormikField,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import { BaseSyntheticEvent } from "react";

export const Step1Data = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext<PaymentFormType>();
  return (
    <div data-qa="automatic-payment-modal-step-1">
      {values.paymentMethod === "paypal" ? (
        <div data-qa="automatic-payment-pp">
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
        <div data-qa="automatic-payment-bank">
          <Field
            name="bankaccountOwner"
            type="text"
            label={t("Account holder")}
            placeholder={t("First Name")}
          />
          <Field
            name="iban"
            type="text"
            label={t("IBAN")}
            placeholder="OT2T26635625325382772"
          />
        </div>
      )}
      <FormikField name="termsAcceptance" className="aq-mb-3">
        {({ field, form, meta }: FieldProps) => {
          const onCheckChange = (e: BaseSyntheticEvent) => {
            field.onChange(e);
            form.setFieldValue(field.name, e.target.checked);
          };
          return (
            <FormGroup data-qa="automatic-payment-modal-terms">
              <Checkbox
                id="termsAcceptance"
                name={field.name}
                onChange={onCheckChange}
                checked={field.value}
                label={
                  <strong className="aq-text-primary">
                    <Trans
                      i18nKey={
                        "Accept the <terms_and_conditions_link>conditions</terms_and_conditions_link> before proceeding"
                      }
                      components={{
                        terms_and_conditions_link: (
                          <a
                            target="_blank"
                            data-qa="automatic-payment-modal-terms-link"
                            href={t("/payment_conditions", { ns: "links" })}
                          />
                        ),
                      }}
                    />
                  </strong>
                }
                onBlur={field.onBlur}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
    </div>
  );
};
