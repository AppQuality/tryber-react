import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { OnBoardingSlide } from "./OnBoardingSlide";
import screenshotEngMob from "./assets/corsi_eng_mob.png";
import screenshotEngDesk from "./assets/corsi_eng.png";
import screenshotItaMob from "./assets/corsi_ita_mob.png";
import screenshotItaDesk from "./assets/corsi_ita.png";

export default () => {
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
        {t("Complete the Basic Course")}
      </Title>
      <Text className="main-text">
        {t(
          "Take part in the Basic Course and earn 200 experience points, they will be essential to increase the chances to be selected for the campaigns. You'll become an AppQuality world expert and you will receive the Linkedin Certification to show that you are a qualified member of the Community."
        )}
      </Text>
    </OnBoardingSlide>
  );
};
