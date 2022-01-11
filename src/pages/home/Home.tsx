import { Container, Text, Title } from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import GoogleTagManager from "../../features/GoogleTagManager";
import NotLoggedOnly from "../../features/NotLoggedOnly";
import { BannerTop } from "./content/BannerTop";
import { DataList } from "./content/DataList";
import { Footer } from "./content/Footer";
import JoinTheTeamButton from "./content/JoinTheTeamButton";
import { CardList } from "src/pages/home/content/CardList";
import { Reviews } from "src/pages/home/content/Reviews";
import { LangMenu } from "src/features/LangMenu";
import React from "react";

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
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      margin-bottom: 50vh;
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
            <section className="aq-text-center">
              <div className="section-title text-marker">
                {t("Are you ready to get involved?")}
              </div>
              <Text
                className="aq-my-4 large-desktop"
                style={{
                  maxWidth: "810px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Trans
                  i18nKey="In AppQuality there will never be a lack of challenges and you <bold>will immediately feel part of a dynamic and stimulating Community!</bold> Get on board and start looking at the digital world around you with different eyes. <br></br><br></br>Testing is addictive!"
                  defaults="In AppQuality there will never be a lack of challenges and you <bold>will immediately feel part of a dynamic and stimulating Community!</bold> Get on board and start looking at the digital world around you with different eyes. <br></br><br></br>Testing is addictive!"
                  components={{ br: <br />, bold: <strong /> }}
                />
              </Text>
              <JoinTheTeamButton />
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
