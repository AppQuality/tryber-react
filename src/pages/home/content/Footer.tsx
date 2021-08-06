import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useTranslation } from "react-i18next";
import { Text, Title } from "@appquality/appquality-design-system";
import { EnvelopeFill, GeoAltFill, Bank2, Briefcase } from "react-bootstrap-icons";
import { Button } from "@appquality/appquality-design-system";
import fbLogo from "../assets/fb.svg";
import lnLogo from "../assets/ln.svg";
import telegramLogo from "../assets/telegram.svg";

const StyledFooter = styled.section`
  margin-top: 90px;
  ${Title} {
    text-transform: capitalize;
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    margin-top: 200px;
    display: grid;
    grid-template-columns: 210px 140px 1fr 1fr;
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
    margin-right: ${props => props.theme.grid.spacing.default};
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
      <img src={logo} className="aq-mb-3" />
      <div className="aq-mb-3">
        <Title size="s" color="secondary">
          {t("social")}
        </Title>
        <Button as="a" href="#facebook" type="link" className="social-btn">
          <img src={fbLogo} alt='facebook'/>
        </Button>
        <Button as="a" href="#linkedin" type="link" className="social-btn">
          <img src={lnLogo} alt='linkedin' />
        </Button>
        <Button as="a" href="#telegram" type="link" className="social-btn">
          <img src={telegramLogo} alt='telegram' />
        </Button>
      </div>
      <div className="aq-mb-3">
        <Title size="s" color="secondary">
          {t("address")}
        </Title>
        <Text color="secondary" small>
          <GeoAltFill /> Via del Chiesotto 4, 26100 Cremona, Italy
        </Text>
        <Text color="secondary" small>
          <EnvelopeFill /> crowd@app-quality.com
        </Text>
      </div>
      <div className="aq-mb-3">
        <Title size="s" color="secondary">
          {t("company")}
        </Title>
        <Text color="secondary" small>
          <Briefcase /> AppQuality srl - P.IVA 01603290196
        </Text>
        <Text color="secondary" small>
          <Bank2 /> Capitale Sociale € 22.060,57, di cui € 19.174,11 i.v
        </Text>
      </div>
    </StyledFooter>
  );
};
