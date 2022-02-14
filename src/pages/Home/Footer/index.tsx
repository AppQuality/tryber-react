import { Button, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import fbLogo from "./assets/fb.svg";
import instaLogo from "./assets/insta.svg";
import telegramLogo from "./assets/teleg.svg";
import { ReactComponent as Logo } from "./assets/tryber_logo_full.svg";

const FooterContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.palette.primary};
  max-width: 1140px;
  margin: 0 auto;
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
      padding: 0 0 0 20px;
      margin: 0 auto;
      grid-area: logo;
    }
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "logo info a"
      "b address social"
      "b policy policy";
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
  .policy {
    grid-area: policy;
    color: ${(p) => p.theme.colors.gray300};
    display: flex;
    flex-flow: column;
    a {
      color: ${(p) => p.theme.colors.gray300};
      &:hover {
        color: ${(p) => p.theme.palette.secondary};
      }
    }
    @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
      flex-flow: row;
    }
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
        <Title size="ms" className="aq-mb-2">
          {t("company")}
        </Title>
        <Text small>
          AppQuality srl - P.IVA 01603290196 <br />
          Capitale Sociale € 22.060,57, di cui € 19.174,11 i.v
        </Text>
      </div>
      <div className="grid-item address">
        <Title size="ms" className="aq-mb-2">
          {t("address")}
        </Title>
        <Text small>
          Via del Chiesotto 4, 26100 Cremona, Italy <br />
          support@tryber.me
        </Text>
      </div>
      <div className="grid-item social">
        <Title size="ms" className="aq-mb-2">
          {t("social")}
        </Title>
        <Button
          forwardedAs="a"
          href="https://www.facebook.com/tryber.me"
          type="link"
          className="aq-nopadding aq-mr-4"
          target="_blank"
        >
          <img src={fbLogo} alt="facebook" />
        </Button>
        <Button
          forwardedAs="a"
          href="https://instagram.com/tryber.me?utm_medium=copy_link"
          type="link"
          className="aq-nopadding aq-mr-4"
          target="_blank"
        >
          <img src={instaLogo} alt="instagram" />
        </Button>
        <Button
          forwardedAs="a"
          href="https://t.me/Tryber_me"
          type="link"
          className="aq-nopadding aq-mr-4"
          target="_blank"
        >
          <img src={telegramLogo} alt="telegram" />
        </Button>
      </div>
      <div className="grid-item policy">
        <small>
          © UNGUESS {new Date().getFullYear()} – All rights reserved
        </small>
        <small className="aq-ml-3-md">
          <a
            href="https://www.iubenda.com/privacy-policy/7934311"
            target="_blank"
          >
            Privacy & Cookie Policy
          </a>{" "}
          |{" "}
          <a href="/terms-and-conditions/" target="_blank">
            Terms of Services
          </a>
        </small>
      </div>
    </FooterContainer>
  );
};
