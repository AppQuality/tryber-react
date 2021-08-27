import { Title, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import screenshotEng from "./assets/profilo_eng.png";
import screenshotIta from "./assets/profilo_ita.png";

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
      <Title size="xs">{t("Fill in your profile details")}</Title>
      <Text>
        {t(
          "As first step to be done, complete your profile with authentic and real data. This is the only way to be selected for the Campaigns and get your reward."
        )}
      </Text>
    </div>
  );
};
