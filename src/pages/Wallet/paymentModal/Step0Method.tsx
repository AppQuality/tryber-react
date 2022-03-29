import {
  Checkbox,
  ErrorMessage,
  FormGroup,
  FormikField,
  Radio,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import { BaseSyntheticEvent } from "react";
import { Trans, useTranslation } from "react-i18next";

export const Step0Method = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="aq-mb-1">
        <strong className="aq-text-primary">
          {t("Chose a payment method")}
        </strong>
      </div>
      <FormikField name="paymentMethod" className="aq-mb-3">
        {({ field, form, meta }: FieldProps) => {
          const onRadioChange = (val: string) => {
            field.onChange(val);
            form.setFieldValue(field.name, val);
          };
          return (
            <FormGroup>
              <Radio
                id={`${field.name}-pp`}
                name={field.name}
                value="paypal"
                checked={field.value === "paypal"}
                onChange={onRadioChange}
                label="Paypal"
              />
              <Radio
                id={`${field.name}-bank`}
                name={field.name}
                value="bank"
                checked={field.value === "bank"}
                onChange={onRadioChange}
                label={t("Bank")}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
      <FormikField name="termsAcceptance" className="aq-mb-3">
        {({ field, form, meta }: FieldProps) => {
          const onCheckChange = (e: BaseSyntheticEvent) => {
            field.onChange(e);
            form.setFieldValue(field.name, e.target.checked);
          };
          return (
            <FormGroup>
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
