import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useTranslation } from "react-i18next";
import { Text, Title } from "@appquality/appquality-design-system";
import { Mailbox, PinMap, Bank2, Briefcase } from "react-bootstrap-icons";
import { Button } from "@appquality/appquality-design-system";
import fbLogo from "../assets/fb.svg";
import lnLogo from "../assets/ln.svg";
import telegramLogo from "../assets/telegram.svg";

const StyledFooter = styled.section`
  margin-top: 90px;
  ${Title} {
    text-transform: capitalize;
    margin-bottom: ${(props) => props.theme.grid.spacing.default};
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    margin-top: 200px;
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
        <img src={logo} className="aq-mb-3" alt="appquality logo" />
      </a>
      <div className="aq-mb-3">
        <Title size="s" color="secondary">
          {t("social")}
        </Title>
        <Button
          as="a"
          href="https://www.facebook.com/appqualitypage/"
          type="link"
          className="social-btn"
          target="_blank"
        >
          <img src={fbLogo} alt="facebook" />
        </Button>
        <Button
          as="a"
          href="https://www.linkedin.com/company/app-quality"
          type="link"
          className="social-btn"
          target="_blank"
        >
          <img src={lnLogo} alt="linkedin" />
        </Button>
        <Button
          as="a"
          href="https://t.me/AppQualityCrowd"
          type="link"
          className="social-btn"
          target="_blank"
        >
          <img src={telegramLogo} alt="telegram" />
        </Button>
      </div>
      <div className="aq-mb-3">
        <Title size="s" color="secondary">
          {t("address")}
        </Title>
        <Text color="secondary" small className="aq-mb-2">
          <div style={{ display: "flex" }}>
            <PinMap size="1.15em" className="aq-mr-2" /> Via del Chiesotto 4,
            26100 Cremona, Italy
          </div>
        </Text>
        <Text color="secondary" small>
          <div style={{ display: "flex" }}>
            <Mailbox size="1.15em" className="aq-mr-2" />{" "}
            <a href="mailto:crowd@app-quality.com">crowd@app-quality.com</a>
          </div>
        </Text>
      </div>
      <div className="aq-mb-3">
        <Title size="s" color="secondary">
          {t("company")}
        </Title>
        <Text color="secondary" small className="aq-mb-2">
          <div style={{ display: "flex" }}>
            <Briefcase size="1.15em" className="aq-mr-2" /> APP QUALITY S.R.L. -
            P.IVA 01603290196
          </div>
        </Text>
        <Text color="secondary" small className="aq-mb-2">
          <div style={{ display: "flex" }}>
            <Bank2 size="1.15em" className="aq-mr-2" /> Capitale Sociale €
            22.060,57, di cui € 19.174,11 i.v
          </div>
        </Text>
      </div>
    </StyledFooter>
  );
};
