import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useTranslation } from "react-i18next";
import { Text, Title } from "@appquality/appquality-design-system";
import { Envelope, GeoAltFill } from "react-bootstrap-icons";
import { Button } from "@appquality/appquality-design-system";
import fbLogo from "../assets/fb.svg";
import lnLogo from "../assets/ln.svg";
import telegramLogo from "../assets/telegram.svg";

const StyledFooter = styled.section`
  margin-top: 90px;
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    margin-top: 200px;
    display: grid;
    grid-template-columns: 1fr 1fr 100px;
  }
  .social-btn {
    padding: 0;
    font-size: 28px;
    height: 28px;
    width: 28px;
  }
`;

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <StyledFooter>
      <img src={logo} className="aq-mb-3" />
      <div className="aq-mb-3">
        <Title size="s" color="secondary">
          {t("company")}
        </Title>
        <Text color="secondary">
          <Envelope />
          crowd@app-quality.com
        </Text>
        <Text color="secondary">
          <GeoAltFill />
          Via del Chiesotto 4, 26100 Cremona, Italy
        </Text>
      </div>
      <div className="aq-mb-3">
        <Title size="s" color="secondary">
          {t("social")}
        </Title>
        <Button as="a" href="#facebook" type="link" className="social-btn">
          <img src={fbLogo} />
        </Button>
        <Button as="a" href="#linkedin" type="link" className="social-btn">
          <img src={lnLogo} />
        </Button>
        <Button as="a" href="#telegram" type="link" className="social-btn">
          <img src={telegramLogo} />
        </Button>
      </div>
    </StyledFooter>
  );
};
