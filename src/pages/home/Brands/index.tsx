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
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.xl}) {
    width: 50%;
  }
`;
const BrandList = styled.div`
  margin: 0 auto;
  width: 80%;
  img {
    max-width: 50%;
    height: auto;
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.lg}) {
    img {
      max-width: 25%;
    }
  }
`;
export const Brands = () => {
  const { t } = useTranslation();
  return (
    <BrandContainer>
      <BrandTitle size="s" className="aq-text-center">
        {t("__HOME_TITLE_BRAND MAX:40")}
      </BrandTitle>
      <BrandList>
        <img src={SkyLogo} alt="Sky Logo" />
        <img src={MilestoneLogo} alt="Milestone Logo" />
        <img src={LottomaticaLogo} alt="Lottomatica Logo" />
        <img src={BendingSpoonsLogo} alt="Bending Spoons Logo" />
      </BrandList>
    </BrandContainer>
  );
};
