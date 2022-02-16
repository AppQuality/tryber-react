import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import BendingSpoonsLogo from "./assets/BendingSpoonsLogo.png";
import LottomaticaLogo from "./assets/LottomaticaLogo.png";
import MilestoneLogo from "./assets/MilestoneLogo.png";
import SkyLogo from "./assets/SkyLogo.png";

const BrandContainer = styled.div`
  margin: 160px 0;
`;
const BrandTitle = styled(Title)`
  padding-bottom: 24px;
  border-bottom: 2px solid ${(props) => props.theme.palette.primary};
  margin: 0 auto;
  font-size: 20px;
  width: 80%;
  margin-bottom: 50px;
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.lg}) {
    width: 75%;
    font-size: 24px;
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.xl}) {
    width: 50%;
    font-size: 26px;
  }
`;
const BrandList = styled.div`
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    display: flex;
    justify-content: center;
  }
  .brand-row {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: ${(p) => p.theme.grid.sizes[3]};
      @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
        margin-bottom: 0;
      }
    }
    img {
      max-height: 73px;
    }
  }
  .brand-logo {
    flex: 0 0 auto;
    &:nth-child(1) {
      margin-right: ${(p) => p.theme.grid.sizes[4]};
    }
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      &:nth-child(1) {
        margin-right: 0;
      }
      &:not(.lg-4) {
        margin-right: ${(p) => p.theme.grid.sizes[4]};
      }
    }
  }
  // order
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    .lg-1 {
      order: 1;
    }
    .lg-2 {
      order: 2;
    }
    .lg-3 {
      order: 3;
    }
    .lg-4 {
      order: 4;
    }
  }
`;

export default () => {
  const { t } = useTranslation();
  return (
    <BrandContainer>
      <BrandTitle size="s" className="aq-text-center">
        {t("__HOME_TITLE_BRAND MAX:40")}
      </BrandTitle>
      <BrandList>
        <div className="brand-row">
          <div className="brand-logo lg-1">
            <img src={SkyLogo} alt="Sky Logo" />
          </div>
          <div className="brand-logo lg-2">
            <img src={BendingSpoonsLogo} alt="Bending Spoons Logo" />
          </div>
        </div>
        <div className="brand-row">
          <div className="brand-logo lg-4">
            <img src={LottomaticaLogo} alt="Lottomatica Logo" />
          </div>
          <div className="brand-logo lg-3">
            <img src={MilestoneLogo} alt="Milestone Logo" />
          </div>
        </div>
      </BrandList>
    </BrandContainer>
  );
};
