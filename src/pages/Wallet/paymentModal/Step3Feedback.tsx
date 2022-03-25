import { Trans, useTranslation } from "react-i18next";
import { Check2Circle } from "react-bootstrap-icons";
import { aqBootstrapTheme, Text } from "@appquality/appquality-design-system";

export const Step3Feedback = () => {
  const { t } = useTranslation();
  return (
    <div className="aq-text-center">
      <div>
        <Check2Circle color={aqBootstrapTheme.palette.success} size={33} />
      </div>
      <strong>{t("We got it!")}</strong>
      <Text>
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
