import {
  Container,
  Title,
  Text,
  SpinnerWrapper,
  Spinner,
} from "@appquality/appquality-design-system";
import React, { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import testerIcon from "./assets/testers.svg";
import campaignsIcon from "./assets/campaigns.svg";
import devicesIcon from "./assets/devices.svg";
import bugsIcon from "./assets/bugs.svg";
import { StyledSection } from "./_styles";
import { BannerTop } from "./content/BannerTop";
import { DataList } from "./content/DataList";
import { DataListItem } from "./_types";
import { ReviewSection } from "./content/ReviewSection";
import { CardSection } from "./content/CardSection";
import { Footer } from "./content/Footer";
import styled from "styled-components";
import JoinTheTeamButton from "./content/JoinTheTeamButton";
import { useUser } from "../../store/useUser";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: 0,
    tester_id: 0,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

const StyledHome = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
  background-image: linear-gradient(
    #d5e6f0 0,
    #fbfbfd 34%,
    #fbfbfd 66%,
    #e3eef5 100%
  );
  ${Text}.large-desktop {
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      font-size: 17.5px;
    }
  }
`;
export default function Home() {
  const { t, i18n } = useTranslation();
  const { user, isLoading } = useUser();
  TagManager.dataLayer(tagManagerArgs);

  useEffect(() => {
    if (user) {
      window.location.href =
        i18n.language == "en"
          ? "/my-dashboard/"
          : `/${i18n.language}/my-dashboard/`;
    }
  }, [user]);

  const helmet = (
    <Helmet>
      <title>{t("Home")} - AppQuality Crowd</title>
      <meta property="og:title" content={t("home")} />
      <meta name="description" content={t("home")} />
    </Helmet>
  );

  const communityData: DataListItem[] = [
    {
      name: t("testers"),
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

  if (isLoading || user) {
    return (
      <>
        {helmet}
        <Container className="aq-py-3">
          <SpinnerWrapper>
            <Spinner />
            <Title size="xs" as="h5">
              {t("Loading")}
            </Title>
          </SpinnerWrapper>
        </Container>
      </>
    );
  }
  return (
    <StyledHome>
      {helmet}
      <Container className="aq-py-3">
        <section className="aq-mb-4">
          <BannerTop />
        </section>
        <section className="aq-pt-3 aq-text-center">
          <Title size="m" className="aq-pt-3 aq-pb-2 aq-mb-2">
            {t("Our Community")}
          </Title>
          <div className="aq-pt-4">
            <DataList data={communityData} />
          </div>
        </section>
        <CardSection />
        <StyledSection className="aq-text-center" style={{ zIndex: 1 }}>
          <Title size="xl">{t("Are you ready to get involved?")}</Title>
          <Text
            color="secondary"
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
        </StyledSection>
        <ReviewSection />
        <Footer />
      </Container>
    </StyledHome>
  );
}
