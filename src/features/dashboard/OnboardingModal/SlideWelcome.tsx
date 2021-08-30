import { useTranslation } from "react-i18next";
import welcomeImgDesk from "./assets/welcome.png";
import welcomeImgMob from "./assets/welcome.png";
import { Text } from "@appquality/appquality-design-system";
import { OnBoardingSlide } from "./OnBoardingSlide";

export default () => {
  const { t } = useTranslation();
  return (
    <OnBoardingSlide className="aq-mb-3">
      <div
        className="main-img"
        style={{
          "--mobile-bg": `url(${welcomeImgMob})`,
          "--desktop-bg": `url(${welcomeImgDesk})`,
        }}
      />
      <Text className="main-text">
        {t(
          "You are few steps away from making your experience memorable in the AppQuality Community World!"
        )}
      </Text>
    </OnBoardingSlide>
  );
};
