import {
  ErrorMessage,
  FormGroup,
  FormikField,
  Radio,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import useFiscalTypeText from "src/hooks/useFiscalTypesText";
import { Trans, useTranslation } from "react-i18next";
import localizedUrl from "src/utils/localizedUrl";

export const Step0Method = () => {
  const { t } = useTranslation();
  const fiscalTypeText = useFiscalTypeText();
  return (
    <div>
      <div className="aq-mb-1" data-qa="automatic-payment-next-steps">
        <Text>
          <Trans
            i18nKey="available tags: <br>, <p>, <strong>, <title>, <ul>, <li>:::PAYMENTS_MODAL_AUTOMATIC_STEP_1_RECAP"
            components={{
              br: <br />,
              p: <p className="aq-mb-3" />,
              title: <Title size="xs" className="aq-mb-1" />,
              strong: <strong className="aq-text-primary" />,
              ul: <ul className="aq-mb-3" />,
              li: <li />,
            }}
            defaults={`
              <title>What you have to do now</title>
              <ul>
                <li>Choose the payment method and check that your fiscal type is correct</li>
                <li>Insert your personal information and accept the conditions</li>
                <li>Send your payment request</li>
              </ul>
            `}
          />
        </Text>
      </div>
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
                label={t("__PAYMENT-METHOD-BANK")}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </FormikField>
      <div className="aq-mb-1" data-qa="automatic-payment-fiscal-profile">
        <Text>
          <Trans
            i18nKey="available tags: <br>, <p>, <strong>, <title>, <fiscalprofilelink>, <ul>, <li>:::PAYMENTS_MODAL_AUTOMATIC_STEP_1_RECAP{{fiscalType}}"
            values={{ fiscalType: fiscalTypeText }}
            components={{
              br: <br />,
              p: <p className="aq-mb-3" />,
              title: <Title size="xs" className="aq-mb-1" />,
              strong: <strong className="aq-text-primary" />,
              fiscalprofilelink: (
                <a
                  target="_blank"
                  href={localizedUrl("/my-account/?tab=fiscal")}
                />
              ),
              ul: <ul className="aq-mb-3" />,
              li: <li />,
            }}
            defaults={`
              <title>Your fiscal type is:</title>
              <p>
              {{fiscalType}}
              </p>
              <strong>Need to update your fiscal type? Go to <fiscalprofilelink>your profile</fiscalprofilelink> before proceeding.</strong>
            `}
          />
        </Text>
      </div>
    </div>
  );
};
