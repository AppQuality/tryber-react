import { BSCol, BSGrid, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import people from "../assets/tryber_home_welcome.png";
import JoinInButton from "./JoinInButton";

export const BannerTop = () => {
  const { t } = useTranslation();
  const SectionBanner = styled.div`
    margin-bottom:60px;
      @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
        margin: 16px -32px 16px 16px;
        margin-bottom: 120px;
      }
    }
  `;
  return (
    <SectionBanner className="section-banner">
      <BSGrid>
        <BSCol size="col-md-6" className="aq-order-2-md">
          <img
            className="banner-img aq-mb-4"
            src={people}
            alt="tryber get involved"
          />
        </BSCol>
        <BSCol size="col-md-6" className="aq-order-1-md">
          <div className="text-marker section-title aq-text-primary aq-mb-4">
            {t("__HOME_TITLE_WELCOME MAX:40")}
          </div>
          <Text className="aq-mb-4 large-desktop">
            <div className="aq-mb-2">
              {t("__HOME_PARAGRAPH_WELCOME MAX:150")}
            </div>
          </Text>
          <JoinInButton flat={false}>
            {t("__HOME_CTA_WELCOME MAX:25")}
          </JoinInButton>
          <div className="text-marker aq-text-primary">
            {t("__HOME_SUBTITLE-CTA_WELCOME MAX:30")}
          </div>
        </BSCol>
      </BSGrid>
    </SectionBanner>
  );
};
