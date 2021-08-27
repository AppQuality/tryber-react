import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import screenshotEng from "./assets/corsi_eng.png";
import screenshotIta from "./assets/corsi_ita.png";

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
    <div>
      <img src={renderImg()} />
      <Title size="xs">{t("Complete the Basic Course")}</Title>
      <Text>
        {t(
          "Take part in the Basic Course and earn 200 experience points, they will be essential to increase the chances to be selected for the campaigns. You'll become an AppQuality world expert and you will receive the Linkedin Certification to show that you are a qualified member of the Community."
        )}
      </Text>
    </div>
  );
};
