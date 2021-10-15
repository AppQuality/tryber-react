import { Title, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import screenshotEngDesk from "./assets/profilo_eng.png";
import screenshotEngMob from "./assets/profilo_eng_mob.png";
import screenshotItaDesk from "./assets/profilo_ita.png";
import screenshotItaMob from "./assets/profilo_ita_mob.png";
import { OnBoardingSlide } from "./OnBoardingSlide";

const SlideProfile = () => {
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
        {t("Fill in your profile details")}
      </Title>
      <Text className="main-text aq-mb-3">
        {t(
          "As first step to be done, complete your profile with authentic and real data. This is the only way to be selected for the Campaigns and get your reward."
        )}
      </Text>
    </OnBoardingSlide>
  );
};

export default SlideProfile;
