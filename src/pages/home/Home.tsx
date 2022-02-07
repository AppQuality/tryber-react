import { Container, Text } from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import { AboutUnguess } from "src/pages/home/content/AboutUnguess";
import { Brands } from "src/pages/home/content/Brands";
import { CardList } from "src/pages/home/content/CardList";
import { CareerPaths } from "src/pages/home/content/CareerPaths";
import { HowToJoinTryber } from "src/pages/home/content/HowToJoinTryber";
import { Reviews } from "src/pages/home/content/Reviews";
import styled from "styled-components";

import GoogleTagManager from "../../features/GoogleTagManager";
import NotLoggedOnly from "../../features/NotLoggedOnly";
import borderBottomLg from "./assets/bottom_large.svg";
import borderBottomSm from "./assets/bottom_small.svg";
import borderTopLg from "./assets/top_large.svg";
import borderTopSm from "./assets/top_small.svg";
import tryberCharacters1 from "./assets/tryberini1.svg";
import tryberCharacters3 from "./assets/tryberini3.svg";
import tryberCharacters4 from "./assets/tryberini4.svg";
import { BannerTop } from "./content/BannerTop";
import { DataList } from "./content/DataList";
import { Footer } from "./content/Footer";

const bgSpaceSm = "55px";
const bgSpaceLg = "75px";
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
  .home-section {
    margin-bottom: 100px;
    position: relative;
    z-index: 0;
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      margin-bottom: 30vh;
    }
    &.gradient-bg {
      padding: ${bgSpaceSm} 0;
      background: linear-gradient(180deg, #e9bb38 0%, #811dd7 100%);
      min-height: 600px;
      @media only screen and (min-width: ${(props) =>
          props.theme.grid.breakpoints.lg}) {
        padding: ${bgSpaceLg} 0;
        background: linear-gradient(
          90deg,
          #ffdc17 0.42%,
          #f9d320 10.82%,
          #e9bb38 27.72%,
          #d0945f 49%,
          #ac5e96 73.83%,
          #811dd7 100%
        );
      }
      .section-border {
        width: 100%;
        height: 50%;
        position: absolute;
        z-index: -1;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .border-top {
        background-image: url(${borderTopSm});
        background-position: top;
        top: -${bgSpaceSm};
        @media only screen and (min-width: ${(props) =>
            props.theme.grid.breakpoints.lg}) {
          top: -${bgSpaceLg};
          background-image: url(${borderTopLg});
        }
      }
      .border-bottom {
        background-image: url(${borderBottomSm});
        background-position: bottom;
        bottom: -${bgSpaceSm};
        @media only screen and (min-width: ${(props) =>
            props.theme.grid.breakpoints.lg}) {
          bottom: -${bgSpaceLg};
          background-image: url(${borderBottomLg});
        }
      }
    }
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
  .banner-img {
    float: right;
    width: 64%;
    margin: 50px -40px 20px 20px;
    shape-outside: ellipse(50% 100px at 71% 63%);
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.md}) {
      width: 320px;
      shape-outside: none;
    }
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      width: 540px;
      margin: 16px -32px 16px 16px;
    }
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
  // advices
  .bg-stain {
    position: absolute;
    z-index: -1;
    top: 0;
    max-width: none;
    left: -600px;
    height: 600px;
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      top: -50px;
      left: -290px;
      height: 560px;
    }
  }
  .tryberCharacters-4 {
    width: 100px;
    display: block;
    margin: 0 auto 16px;
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      width: 200px;
      display: block;
      margin: unset;
      position: absolute;
      left: -190px;
      top: -70px;
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
            <section className="home-section gradient-bg hero">
              <div className="text-marker aq-text-center aq-mb-4 section-title">
                <div className="tryber-character-wrapper">
                  <img
                    className="tryberCharacters-3"
                    src={tryberCharacters3}
                    alt="tryber characters"
                  />
                  {t("Why should you become an AppQuality Tester?")}
                </div>
              </div>
              <div className="container">
                <CardList />
              </div>
            </section>
            <section>
              <CareerPaths />
            </section>
            <section className="home-section aq-pt-3 aq-text-center">
              <div className="section-title text-marker aq-pt-3 aq-pb-2 aq-mb-2">
                <div className="tryber-character-wrapper">
                  {t("Our Community")}
                  <img
                    className="tryberCharacters-1"
                    src={tryberCharacters1}
                    alt="tryber characters"
                  />
                </div>
              </div>
              <div className="aq-pt-4">
                <DataList />
              </div>
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
              <div className="container">
                <div className="section-title text-marker aq-text-center aq-mb-4">
                  <div className="tryber-character-wrapper">
                    <img
                      className="tryberCharacters-4"
                      src={tryberCharacters4}
                      alt="tryber characters"
                    />
                    {t("Our Testers advices")}
                  </div>
                </div>
                <div className="aq-pt-3">
                  <Reviews />
                </div>
              </div>
            </section>
            <Footer />
          </Container>
        </StyledHome>
      </NotLoggedOnly>
    </GoogleTagManager>
  );
}
