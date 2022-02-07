import { Text } from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";

import people from "../assets/tryber_home_welcome.png";
import JoinInButton from "./JoinInButton";

export const BannerTop = () => {
  const { t } = useTranslation();

  return (
    <div className="section-banner">
      <img className="banner-img" src={people} alt="tryber get involved" />
      <div className="text-marker section-title aq-text-primary aq-mb-4">
        {t("Join the AppQuality Tester Community!")}
      </div>
      <Text className="aq-mb-4 large-desktop">
        <div className="aq-mb-2">
          {t(
            "Have you ever surfed the internet with your smartphone or computer and come across an app or website that is unintuitive or has errors?"
          )}
        </div>
        <Trans
          i18nKey={
            "With AppQuality you will <2>have the opportunity to use services and apps of big companies</2>, report anomalous behaviors that you find and improve the experience offered to the user.<4></4><5>Your feedback and work are valuable!</5>"
          }
        >
          With AppQuality you will{" "}
          <strong>
            have the opportunity to use services and apps of big companies
          </strong>
          , report anomalous behaviors that you find and improve the experience
          offered to the user.
          <br />
          <strong>Your feedback and work are valuable!</strong>
        </Trans>
      </Text>
      <JoinInButton flat={false} />
      <div className="text-marker aq-text-primary aq-mt-4">
        {t("it's totally free")}
      </div>
    </div>
  );
};
