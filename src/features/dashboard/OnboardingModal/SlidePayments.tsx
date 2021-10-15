import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { OnBoardingSlide } from "./OnBoardingSlide";
import screenshotEngMob from "./assets/pagamenti_eng_mob.png";
import screenshotEngDesk from "./assets/pagamenti_eng.png";
import screenshotItaMob from "./assets/pagamenti_ita_mob.png";
import screenshotItaDesk from "./assets/pagamenti_ita.png";

const SlidePayments = () => {
  const { t, i18n } = useTranslation();
  const renderImg = () => {
    switch (i18n.language) {
      case "en":
        return {
          "--mobile-bg": `url(${screenshotEngMob})`,
          "--desktop-bg": `url(${screenshotEngDesk})`,
        };
      case "it":
        return {
          "--mobile-bg": `url(${screenshotItaMob})`,
          "--desktop-bg": `url(${screenshotItaDesk})`,
        };
      default:
        return {
          "--mobile-bg": `url(${screenshotEngMob})`,
          "--desktop-bg": `url(${screenshotEngDesk})`,
        };
    }
  };
  return (
    <OnBoardingSlide className="aq-mb-3">
      <div className="main-img aq-mb-3">
        <div className="main-img" style={renderImg()} />
      </div>
      <Title className="aq-mb-2" size="xs" as="h3">
        {t("Your efforts will pay off")}
      </Title>
      <Text className="main-text">
        {t(
          "With your work you can unlock cash prizes and/or experience points." +
            " Before each activity you will be informed of the expected prize, which will vary depending on the effort required: from a few euros to hundreds." +
            " Remember that you can unlock it only by completing the activity! In the payment section you can view your situation and request at any time the payout accumulated via Paypal or bank transfer."
        )}
      </Text>
    </OnBoardingSlide>
  );
};

export default SlidePayments;
