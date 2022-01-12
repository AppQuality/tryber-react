import { Button, Text, Title } from "@appquality/appquality-design-system";
import { Bank2, Briefcase, Mailbox, PinMap } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import fbLogo from "../assets/fb.svg";
import lnLogo from "../assets/ln.svg";
import logo from "../assets/tryber_logo_full.svg";
import telegramLogo from "../assets/telegram.svg";

const StyledFooter = styled.div`
  ${Title} {
    text-transform: capitalize;
    margin-bottom: ${(props) => props.theme.grid.spacing.default};
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    display: grid;
    grid-template-columns: 210px 140px 1fr 1.1fr;
    grid-gap: 60px;
  }
  .social-btn {
    padding: 0;
    font-size: 28px;
    height: 28px;
    width: 28px;
    display: inline-block;
    border-radius: 4px;
    overflow: hidden;
    margin-right: ${(props) => props.theme.grid.spacing.default};
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
`;

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <StyledFooter>
      <a href="https://app-quality.com">
        <img src={logo} className="aq-mb-3" />
      </a>
      <div className="aq-mb-3">
        <Title size="s">{t("social")}</Title>
        <Button
          forwardedAs="a"
          href="https://www.facebook.com/appqualitypage/"
          type="link"
          className="social-btn"
          target="_blank"
        >
          <img src={fbLogo} alt="facebook" />
        </Button>
        <Button
          forwardedAs="a"
          href="https://www.linkedin.com/company/app-quality"
          type="link"
          className="social-btn"
          target="_blank"
        >
          <img src={lnLogo} alt="linkedin" />
        </Button>
        <Button
          forwardedAs="a"
          href="https://t.me/AppQualityCrowd"
          type="link"
          className="social-btn"
          target="_blank"
        >
          <img src={telegramLogo} alt="telegram" />
        </Button>
      </div>
      <div className="aq-mb-3">
        <Title size="s">{t("address")}</Title>
        <Text small className="aq-mb-2">
          <div style={{ display: "flex" }}>
            <PinMap size="1.15em" className="aq-mr-2" /> Via del Chiesotto 4,
            26100 Cremona, Italy
          </div>
        </Text>
        <Text small>
          <div style={{ display: "flex" }}>
            <Mailbox size="1.15em" className="aq-mr-2" />{" "}
            <a href="mailto:crowd@app-quality.com">crowd@app-quality.com</a>
          </div>
        </Text>
      </div>
      <div className="aq-mb-3">
        <Title size="s">{t("company")}</Title>
        <Text small className="aq-mb-2">
          <div style={{ display: "flex" }}>
            <Briefcase size="1.15em" className="aq-mr-2" /> APP QUALITY S.R.L. -
            P.IVA 01603290196
          </div>
        </Text>
        <Text small className="aq-mb-2">
          <div style={{ display: "flex" }}>
            <Bank2 size="1.15em" className="aq-mr-2" /> Capitale Sociale €
            22.060,57, di cui € 19.174,11 i.v
          </div>
        </Text>
      </div>
    </StyledFooter>
  );
};
