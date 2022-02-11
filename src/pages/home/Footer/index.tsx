import { Button, Text, Title } from '@appquality/appquality-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import fbLogo from './assets/fb.svg';
import instaLogo from './assets/insta.svg';
import telegramLogo from './assets/teleg.svg';
import logo from './assets/tryber_logo_full.svg';

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
  .trb-footer-logo {
    margin-left: auto;
    margin-right: auto;
    display: block;
    @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
      display: initial;
    }
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

export default () => {
  const { t } = useTranslation();
  return (
    <StyledFooter>
      <a href="https://tryber.me">
        <img className="trb-footer-logo aq-mb-3" src={logo} />
      </a>
      <div className="aq-mb-3">
        <Title size="s">{t("company")}</Title>
        <Text small className="aq-mb-2">
          <div style={{ display: "flex" }}>
            APP QUALITY S.R.L. - P.IVA 01603290196
          </div>
        </Text>
        <Text small className="aq-mb-2">
          <div style={{ display: "flex" }}>
            Capitale Sociale € 22.060,57, di cui € 19.174,11 i.v
          </div>
        </Text>
      </div>
      <div className="aq-mb-3">
        <Title size="s">{t("address")}</Title>
        <Text small className="aq-mb-2">
          <div style={{ display: "flex" }}>
            Via del Chiesotto 4, 26100 Cremona, Italy
          </div>
        </Text>
        <Text small>
          <div style={{ display: "flex" }}>
            <a href="mailto:support@tryber.me">support@tryber.me</a>
          </div>
        </Text>
      </div>
      <div className="aq-mb-3">
        <Title size="s">{t("social")}</Title>
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
    </StyledFooter>
  );
};
