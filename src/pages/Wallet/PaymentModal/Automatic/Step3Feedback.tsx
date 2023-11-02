import { aqBootstrapTheme, Text } from "@appquality/appquality-design-system";
import { Check2Circle } from "react-bootstrap-icons";
import { Trans, useTranslation } from "react-i18next";

export const Step3Feedback = () => {
  const { t } = useTranslation();
  return (
    <div
      className="aq-text-center aq-pb-4"
      data-qa="automatic-payment-modal-step-4"
    >
      <div>
        <Check2Circle color={aqBootstrapTheme.palette.success} size={33} />
      </div>
      <strong className="aq-text-primary">{t("We got it!")}</strong>
      <Text className="aq-text-primary">
        {
          <Trans
            i18nKey={
              "Your payment request was successful.<br />You will receive the payment <strong>within 10 working days.</strong>"
            }
            components={{ bold: <strong />, newLine: <br /> }}
          >
            Your payment request was successful.
            <br />
            You will receive the payment{" "}
            <strong>within 10 working days.</strong>
          </Trans>
        }
      </Text>
    </div>
  );
};
