import { Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

import people from "../assets/tryber_home_welcome.png";
import JoinInButton from "./JoinInButton";

export const BannerTop = () => {
  const { t } = useTranslation();

  return (
    <div className="section-banner">
      <img className="banner-img" src={people} alt="tryber get involved" />
      <div className="text-marker section-title aq-text-primary aq-mb-4">
        {t("__HOME_TITLE_WELCOME MAX:40")}
      </div>
      <Text className="aq-mb-4 large-desktop">
        <div className="aq-mb-2">{t("__HOME_PARAGRAPH_WELCOME MAX:150")}</div>
      </Text>
      <JoinInButton flat={false}>{t("__HOME_CTA_WELCOME MAX:25")}</JoinInButton>
      <div className="text-marker aq-text-primary aq-mt-4">
        {t("__HOME_SUBTITLE-CTA_WELCOME MAX:30")}
      </div>
    </div>
  );
};
