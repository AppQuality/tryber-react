import React from "react";
import {
  Container,
  Title,
  Button,
  Text,
} from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import testerIcon from "./assets/testers.svg";
import campaignsIcon from "./assets/campaigns.svg";
import devicesIcon from "./assets/devices.svg";
import bugsIcon from "./assets/bugs.svg";
import { StyledSection, StyledCta } from "./_styles";
import { BannerTop } from "./content/BannerTop";
import { DataList } from "./content/DataList";
import { DataListItem } from "./_types";
import { ReviewSection } from "./content/ReviewSection";
import { CardSection } from "./content/CardSection";
import { Footer } from "./content/Footer";
import styled from "styled-components";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: false,
    tester_id: false,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

const StyledHome = styled.div`
  max-height: calc(100vh - 54px);
  max-width: 100vw;
  overflow-y: scroll;
  overflow-x: hidden;
  background-image: linear-gradient(
    #d5e6f0 0,
    #fbfbfd 34%,
    #fbfbfd 66%,
    #e3eef5 100%
  );
`;
export default function Home() {
  const { t, i18n } = useTranslation();
  TagManager.dataLayer(tagManagerArgs);

  const helmet = (
    <Helmet>
      <title>{t("Home")} - AppQuality Crowd</title>
      <meta property="og:title" content={t("home")} />
      <meta name="description" content={t("home")} />
    </Helmet>
  );

  const communityData: DataListItem[] = [
    {
      name: t("tester"),
      icon: testerIcon,
      text: "25.000",
    },
    {
      name: t("devices"),
      icon: devicesIcon,
      text: "25.000",
    },
    {
      name: t("testing campaigns"),
      icon: campaignsIcon,
      text: "2.500",
    },
    {
      name: t("bugs found"),
      icon: bugsIcon,
      text: "150.000",
    },
  ];
  //const [middleRectRef, middleRectEntry] = useObserver<HTMLDivElement>();
  return (
    <StyledHome>
      {helmet}
      <Container className="aq-pb-3">
        <section className="aq-mb-4">
          <BannerTop />
        </section>
        <section className="aq-pt-3 aq-text-center">
          <Title size="m" className="aq-pt-3 aq-pb-2 aq-mb-2">
            La nostra community
          </Title>
          <div className="aq-pt-4">
            <DataList data={communityData} />
          </div>
        </section>
        <CardSection />
        <StyledSection className="aq-text-center" style={{ zIndex: 1 }}>
          <Title size="xl">Sei pronto a metterti in gioco?</Title>
          <Text
            color="secondary"
            className="aq-my-4"
            style={{
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Trans
              key={
                "In AppQuality le sfide non mancheranno mai e <1>ti sentirai subito parte di una Community dinamica e stimolante!</1> Sali a bordo e guarderai con occhi diversi il mondo digitale intorno a te. Testare crea dipendenza!"
              }
            >
              In AppQuality le sfide non mancheranno mai e{" "}
              <strong>
                ti sentirai subito parte di una Community dinamica e stimolante!
              </strong>{" "}
              Sali a bordo e guarderai con occhi diversi il mondo digitale
              intorno a te. <br />
              <br />
              Testare crea dipendenza!
            </Trans>
          </Text>
          <StyledCta className="aq-text-center">
            <Button
              type="success"
              size="block"
              className="aq-mt-3 capitalize-first"
            >
              {t("join the team")}
            </Button>
          </StyledCta>
        </StyledSection>
        <ReviewSection />
        <Footer />
      </Container>
    </StyledHome>
  );
}
