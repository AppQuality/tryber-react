import { Container, Text } from "@appquality/appquality-design-system";
import { LangMenu } from "src/features/LangMenu";
import { OutsideContainer, PageTemplate } from "src/features/PageTemplate";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
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
  ${Text} {
    font-weight: ${(p) => p.theme.typography.fontWeight.normal};
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
  ${Text}.subtitle {
    font-size: 22px;
    line-height: 1.3;
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.md}) {
      font-size: 24px;
    }
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      font-size: 26px;
      line-height: 1.5;
    }
  }
`;
export default function Home() {
  const { t } = useTranslation();
  return (
    <PageTemplate
      shouldBeLoggedIn={false}
      route="home"
      title={`Tryber - ${t("Earn money using your devices")}`}
    >
      <OutsideContainer>
        <StyledHome>
          <Container className="aq-pt-3">
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
      </OutsideContainer>
    </PageTemplate>
  );
}
