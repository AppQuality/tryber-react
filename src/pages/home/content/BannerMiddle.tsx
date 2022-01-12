import { Text } from "@appquality/appquality-design-system";
import getInvolved from "../assets/tryber_home_get_involved.png";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import JoinTheTeamButton from "./JoinTheTeamButton";
import React from "react";

export const BannerMiddle = () => {
  const { t } = useTranslation();
  return (
    <div className="section-banner">
      <img
        className="banner-img"
        src={getInvolved}
        alt="tryber welcome people"
      />
      <div className="section-title text-marker aq-text-secondary">
        {t("Are you ready to get involved?")}
      </div>
      <Text className="aq-my-4 large-desktop">
        <Trans
          i18nKey="In AppQuality there will never be a lack of challenges and you <bold>will immediately feel part of a dynamic and stimulating Community!</bold> Get on board and start looking at the digital world around you with different eyes. <br></br><br></br>Testing is addictive!"
          defaults="In AppQuality there will never be a lack of challenges and you <bold>will immediately feel part of a dynamic and stimulating Community!</bold> Get on board and start looking at the digital world around you with different eyes. <br></br><br></br>Testing is addictive!"
          components={{ br: <br />, bold: <strong /> }}
        />
      </Text>
      <JoinTheTeamButton />
    </div>
  );
};
