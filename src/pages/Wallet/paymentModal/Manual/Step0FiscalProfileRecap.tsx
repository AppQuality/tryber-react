import { Trans, useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { Text, Title } from "@appquality/appquality-design-system";

export const Step0FiscalProfileRecap = () => {
  const { fiscalType } = useSelector(
    (state: GeneralState) => ({
      fiscalType: state.user.fiscal.data?.type,
    }),
    shallowEqual
  );
  return (
    <div data-qa="manual-payment-fiscal-profile-recap">
      <div className="aq-mb-1">
        <Text>
          <Trans
            i18nKey="available tags: <br>, <p>, <strong>, <title>, <fiscalprofilelink>, <ul>, <li>:::PAYMENTS_MODAL_INVOICE_STEP_1_RECAP"
            values={{ fiscalType: fiscalType }}
            components={{
              br: <br />,
              p: <p className="aq-mb-2" />,
              title: <Title size="xs" className="aq-mb-1" />,
              strong: <strong className="aq-text-primary" />,
              fiscalprofilelink: <a href="/my-account/?tab=fiscal" />,
              ul: <ul />,
              li: <li />,
            }}
            defaults={`
          <title>How it works</title>
          <p>
          Insert and confirm your personal information and bank details to request your payment by bank transfer. You will get a confirmation email with the gross amount and the net receivable: use these details to create the invoice you will need to send us
          </p>
          <title>What you have to do now</title>
          <p>
          <ul>
            <li>Check that your fiscal type is correct</li>
            <li>Insert your personal information and bank details and accept the conditions</li>
            <li>Send your payment request</li>
          </ul>
          </p>
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
