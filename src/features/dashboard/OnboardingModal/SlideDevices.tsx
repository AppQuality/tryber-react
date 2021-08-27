import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import screenshotEng from "./assets/dispositivi_eng.png";
import screenshotIta from "./assets/dispositivi_ita.png";

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
      <Title size="xs">{t("Add your devices")}</Title>
      <Text>
        {t(
          "Add the devices you will use for the Tests: they will be the tools to face the campaigns and one of the selection's criteria.\n" +
            "Currently you can add: PCs/Notebooks, Smartphones, Smartwatches, Tablets, Smart Tvs and Boxes/Sticks"
        )}
      </Text>
    </div>
  );
};
