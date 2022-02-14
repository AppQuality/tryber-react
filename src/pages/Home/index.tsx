import { Container, Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import styled from "styled-components";

import GoogleTagManager from "../../features/GoogleTagManager";
import NotLoggedOnly from "../../features/NotLoggedOnly";
import AboutUnguess from "./AboutUnguess";
import BannerTop from "./BannerTop";
import Brands from "./Brands";
import CareerPathsSlider from "./CareerPathsSlider";
import Footer from "./Footer";
import HowToJoinTryber from "./HowToJoinTryber";
import OurCommunity from "./OurCommunity";
import Reviews from "./Reviews";
import WhyJoinTryber from "./WhyJoinTryber";

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
