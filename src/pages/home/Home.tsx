import { Container, Text } from '@appquality/appquality-design-system';
import { useTranslation } from 'react-i18next';
import { LangMenu } from 'src/features/LangMenu';
import { AboutUnguess } from 'src/pages/home/content/AboutUnguess';
import { Brands } from 'src/pages/home/content/Brands';
import { CareerPathsSlider } from 'src/pages/home/content/CareerPathsSlider';
import { HowToJoinTryber } from 'src/pages/home/content/HowToJoinTryber';
import { WhyJoinTryber } from 'src/pages/home/content/WhyJoinTryber';
import styled from 'styled-components';

import GoogleTagManager from '../../features/GoogleTagManager';
import NotLoggedOnly from '../../features/NotLoggedOnly';
import { BannerTop } from './content/BannerTop';
import OurCommunity from './content/OurCommunity';
import Reviews from './content/Reviews';
import Footer from './Footer';

const StyledHome = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
  background-color: #fff;

  ${Text}.large-desktop {
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      font-size: 17.5px;
    }
  }
  .text-marker {
    font-family: "Marker", serif !important;
    text-transform: uppercase;
    line-height: 1.2;
  }
  .section-title {
    position: relative;
    font-size: 35px !important;
    color: ${(props) => props.theme.palette.primary};
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      font-size: 55px !important;
    }
  }
  .section-banner {
    position: relative;
    overflow: visible;
    max-width: 100%;
  }
  .tryber-character-wrapper {
    position: relative;
    width: 100vw;
    width: fit-content;
    max-width: 75vw;
    display: block;
    margin: 0 auto;
  }
  .tryberCharacters-1 {
    position: absolute;
    right: -45px;
    top: -52px;
    width: 68px;
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      width: 154px;
      right: -160px;
      top: -55px;
    }
  }
  // get involved
  .tryberCharacters-2 {
    display: block;
    margin: 0 auto 16px;
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      display: none;
    }
  }
  // why become tryber
  .tryberCharacters-3 {
    width: 40px;
    display: block;
    margin: 0 auto 16px;
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      width: 74px;
      display: block;
      margin: unset;
      position: absolute;
      left: -30px;
      top: -40px;
    }
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.xxl}) {
      left: -80px;
    }
  }
`;
export default function Home() {
  const { t } = useTranslation();
  return (
    <GoogleTagManager title={t("Home")}>
      <NotLoggedOnly>
        <StyledHome>
          <Container className="aq-py-3">
            <LangMenu
              className="aq-mb-4"
              itLink="/it"
              enLink="/"
              esLink="/es"
            />
            <section className="home-section">
              <BannerTop />
            </section>
            <section className="home-section hero">
              <WhyJoinTryber />
            </section>
            <section>
              <CareerPathsSlider />
            </section>
            <section className="home-section our-community hero aq-pt-3 aq-text-center">
              <OurCommunity />
            </section>
            <section>
              <AboutUnguess />
            </section>
            <section>
              <Brands />
            </section>
            <section className="home-section hero">
              <HowToJoinTryber />
            </section>
            <section
              className="home-section hero"
              style={{ overflow: "visible" }}
            >
              <Reviews />
            </section>
            <Footer />
          </Container>
        </StyledHome>
      </NotLoggedOnly>
    </GoogleTagManager>
  );
}
