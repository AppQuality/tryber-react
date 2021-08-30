import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { OnBoardingSlide } from "./OnBoardingSlide";
import screenshotEngMob from "./assets/dispositivi_eng_mob.png";
import screenshotEngDesk from "./assets/dispositivi_eng.png";
import screenshotItaMob from "./assets/dispositivi_ita_mob.png";
import screenshotItaDesk from "./assets/dispositivi_ita.png";

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
        {t("Add your devices")}
      </Title>
      <Text className="main-text">
        {t(
          "Add the devices you will use for the Tests: they will be the tools to face the campaigns and one of the selection's criteria.\n" +
            "Currently you can add: PCs/Notebooks, Smartphones, Smartwatches, Tablets, Smart Tvs and Boxes/Sticks"
        )}
      </Text>
    </OnBoardingSlide>
  );
};
