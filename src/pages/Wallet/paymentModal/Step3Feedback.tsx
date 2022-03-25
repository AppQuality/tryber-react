import { useTranslation } from "react-i18next";
import { Check2Circle } from "react-bootstrap-icons";
import { aqBootstrapTheme, Text } from "@appquality/appquality-design-system";

export const Step3Feedback = () => {
  const { t } = useTranslation();
  return (
    <div className="aq-text-center">
      <Check2Circle color={aqBootstrapTheme.palette.success} size={33} />
      <strong>{t("We got it!")}</strong>
      <Text>{t("You submitted your payment request successfully")}</Text>
      <Text>{t("You will receive the payment within 10 working days.")}</Text>
    </div>
  );
};
