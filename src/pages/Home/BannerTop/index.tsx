import { BSCol, BSGrid, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import JoinInButton from "../_components/JoinInButton";
import people from "./assets/tryber_home_welcome.png";

const SectionBanner = styled.div`
  position: relative;
  overflow: visible;
  max-width: 100%;
  margin-bottom: 60px;
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.lg}) {
    margin: 16px -32px 16px 16px;
    margin-bottom: 120px;
  }
  text-align: center;
  @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
    text-align: left;
  }
`;
export default () => {
  const { t } = useTranslation();
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
          <Text className="aq-mb-4 subtitle">
            {t("__HOME_PARAGRAPH_WELCOME MAX:150")}
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
