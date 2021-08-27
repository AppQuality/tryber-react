import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <Title size="xs">{t("Your efforts will pay off")}</Title>
        {t(
          "With your work you will be able to unlock cash prizes and/or experience points. Before every activity you will be informed about the expected prize, unlockable only by successfully completing the campaign.\n" +
          "The activities that you will encounter as a member of the AppQuality community will always have different prizes, from a few euros up to hundreds for the longest and most complex projects, but remember: everything will depend on your commitment and dedication!\n" +
          " In the payment section you can view your situation and request at any time the payout accumulated via Paypal or bank transfer."
        )}
      </div>
    </>
  );
};
