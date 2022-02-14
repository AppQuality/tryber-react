import { Button, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import fbLogo from "./assets/fb.svg";
import instaLogo from "./assets/insta.svg";
import telegramLogo from "./assets/teleg.svg";
import { ReactComponent as Logo } from "./assets/tryber_logo_full.svg";

const FooterContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.palette.primary};
  padding: 0px 20px;

  ${Title} {
    text-transform: capitalize;
  }
  .grid-item {
    margin: 12px 0;
  }
  .logo {
    padding: 42px;
    svg {
      width: 100%;
    }
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
    padding-top: 60px;
    display: grid;
    grid-column-gap: 80px;
    grid-row-gap: 0px;

    .logo {
      padding: 0;
      margin: 0 auto;
      grid-area: logo;
    }
    .info {
      grid-area: info;
    }
    .address {
      grid-area: address;
    }
    .social {
      grid-area: social;
    }
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-template-areas:
      "logo info a"
      "b address social";
  }

  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    text-align: left;
    margin-left: 80px;
    margin-left: 80px;
  }
`;

export default () => {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <div className="grid-item logo">
        <Logo />
      </div>
      <div className="grid-item info">
        <Title size="ms" className="aq-mb-3">
          {t("company")}
        </Title>
        <Text small>
          AppQuality srl - P.IVA 01603290196 <br />
          Capitale Sociale € 22.060,57, di cui € 19.174,11 i.v
        </Text>
      </div>
      <div className="grid-item address">
        <Title size="ms" className="aq-mb-3">
          {t("address")}
        </Title>
        <Text small>
          Via del Chiesotto 4, 26100 Cremona, Italy <br />
          support@tryber.me
        </Text>
      </div>
      <div className="grid-item social">
        <Title size="ms" className="aq-mb-3">
          {t("social")}
        </Title>
        <Button
          forwardedAs="a"
          href="https://www.facebook.com/tryber.me"
          type="link"
          className="social-btn"
          target="_blank"
        >
          <img src={fbLogo} alt="facebook" />
        </Button>
        <Button
          forwardedAs="a"
          href="https://instagram.com/tryber.me?utm_medium=copy_link"
          type="link"
          className="social-btn"
          target="_blank"
        >
          <img src={instaLogo} alt="instagram" />
        </Button>
        <Button
          forwardedAs="a"
          href="https://t.me/Tryber_me"
          type="link"
          className="social-btn"
          target="_blank"
        >
          <img src={telegramLogo} alt="telegram" />
        </Button>
      </div>
    </FooterContainer>
  );
};
