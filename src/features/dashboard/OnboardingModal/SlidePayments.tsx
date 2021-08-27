import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import screenshotEng from "./assets/pagamenti_eng.png";
import screenshotIta from "./assets/pagamenti_ita.png";
import { OnBoardingSlide } from "./OnBoardingSlide";

export default () => {
  const { t, i18n } = useTranslation();
  const renderImg = () => {
    switch (i18n.language) {
      case "en":
        return screenshotEng;
      case "it":
        return screenshotIta;
      default:
        return screenshotEng;
    }
  };
  return (
    <OnBoardingSlide>
      <div className="main-img aq-mb-3">
        <img src={renderImg()} />
      </div>
      <Title className="aq-mb-2" size="xs" as="h3">
        {t("Your efforts will pay off")}
      </Title>
      {t(
        "With your work you will be able to unlock cash prizes and/or experience points. Before every activity you will be informed about the expected prize, unlockable only by successfully completing the campaign.\n" +
          "The activities that you will encounter as a member of the AppQuality community will always have different prizes, from a few euros up to hundreds for the longest and most complex projects, but remember: everything will depend on your commitment and dedication!\n" +
          " In the payment section you can view your situation and request at any time the payout accumulated via Paypal or bank transfer."
      )}
    </OnBoardingSlide>
  );
};
