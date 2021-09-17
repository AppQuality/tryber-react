import { Container, Title, Text } from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import testerIcon from "./assets/testers.svg";
import campaignsIcon from "./assets/campaigns.svg";
import countriesIcon from "./assets/countries.svg";
import brandsHelped from "./assets/brandsHelped.svg";
import { StyledSection } from "./_styles";
import { BannerTop } from "./content/BannerTop";
import { DataList } from "./content/DataList";
import { DataListItem } from "./_types";
import { ReviewSection } from "./content/ReviewSection";
import { CardSection } from "./content/CardSection";
import { Footer } from "./content/Footer";
import styled from "styled-components";
import JoinTheTeamButton from "./content/JoinTheTeamButton";
import GoogleTagManager from "../../features/GoogleTagManager";
import NotLoggedOnly from "../../features/NotLoggedOnly";

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
  const { t } = useTranslation();

  const communityData: DataListItem[] = [
    {
      name: t("testers"),
      icon: testerIcon,
      text: "30.000",
    },
    {
      name: t("Countries covered"),
      icon: countriesIcon,
      text: "100",
    },
    {
      name: t("Campaigns delivered"),
      icon: campaignsIcon,
      text: "3.500",
    },
    {
      name: t("Brands helped"),
      icon: brandsHelped,
      text: "150",
    },
  ];

  return (
    <GoogleTagManager title={t("Home")}>
      <NotLoggedOnly>
        <StyledHome>
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
      </NotLoggedOnly>
    </GoogleTagManager>
  );
}
