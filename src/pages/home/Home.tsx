import { Container, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import GoogleTagManager from "../../features/GoogleTagManager";
import NotLoggedOnly from "../../features/NotLoggedOnly";
import { BannerTop } from "./content/BannerTop";
import { DataList } from "./content/DataList";
import { Footer } from "./content/Footer";
import { CardList } from "src/pages/home/content/CardList";
import { Reviews } from "src/pages/home/content/Reviews";
import { LangMenu } from "src/features/LangMenu";
import React from "react";
import { BannerMiddle } from "src/pages/home/content/BannerMiddle";

const StyledHome = styled.div`
  max-width: 100vw;
  overflow-x: hidden;

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
  section {
    margin-bottom: 100px;
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      margin-bottom: 30vh;
    }
  }
  .section-title {
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
  .banner-img {
    float: right;
    width: 64%;
    margin: 50px -40px 20px 20px;
    shape-outside: ellipse(50% 90px at 80% 63%);
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      width: 540px;
      margin: 16px -32px 16px 16px;
      shape-outside: none;
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
              className="aq-mb-3"
              itLink="/it"
              enLink="/"
              esLink="/es"
            />
            <section>
              <BannerTop />
            </section>
            <section className="aq-pt-3 aq-text-center">
              <div className="section-title text-marker aq-pt-3 aq-pb-2 aq-mb-2">
                {t("Our Community")}
              </div>
              <div className="aq-pt-4">
                <DataList />
              </div>
            </section>
            <section>
              <Title
                size="xl"
                className="text-marker aq-text-center aq-mb-4 section-title-wrapper"
              >
                {t("Why should you become an AppQuality Tester?")}
              </Title>
              <div className="section-content-wrapper">
                <CardList />
              </div>
            </section>
            <section>
              <BannerMiddle />
            </section>
            <section>
              <div className="section-title text-marker aq-text-center aq-mb-4">
                {t("Our Testers advices")}
              </div>
              <div className="section-content-wrapper aq-pt-3">
                <Reviews />
              </div>
            </section>
            <Footer />
          </Container>
        </StyledHome>
      </NotLoggedOnly>
    </GoogleTagManager>
  );
}
