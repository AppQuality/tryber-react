import {
  Checkbox,
  Field,
  FormGroup,
  FormikField,
} from "@appquality/appquality-design-system";
import { ErrorMessage, FieldProps } from "formik";
import { BaseSyntheticEvent } from "react";
import { Trans, useTranslation } from "react-i18next";

export const Step1Iban = () => {
  const { t } = useTranslation();
  return (
    <div data-qa="manual-payment-modal-step-1">
      <Field
        name="bankaccountOwner"
        type="text"
        label={t("Account holder")}
        placeholder={t("name")}
        data-qa="manual-payment-modal-account-holder"
      />
      <Field
        name="iban"
        type="text"
        label={t("IBAN")}
        placeholder="OT2T26635625325382772"
        data-qa="manual-payment-modal-iban"
      />
      <FormikField name="termsAcceptance" className="aq-mb-3">
        {({ field, form, meta }: FieldProps) => {
          const onCheckChange = (e: BaseSyntheticEvent) => {
            field.onChange(e);
            form.setFieldValue(field.name, e.target.checked);
          };
          return (
            <FormGroup data-qa="manual-payment-modal-terms">
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
                            data-qa="manual-payment-modal-terms-and-conditions-link"
                            target="_blank"
                            rel="noreferrer"
                            href={t("/payment_conditions", {
                              ns: "links",
                            })}
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
