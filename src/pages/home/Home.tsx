import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  BSGrid,
  BSCol,
  Card,
  Spinner,
  SpinnerWrapper,
  PageTitle,
  Title,
  Button,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useUser } from "../../store/useUser";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import { ReactComponent as TopShape } from "./assets/rectangle-top.svg";
import { ReactComponent as MiddleRect } from "./assets/rectangle-985.svg";
import people from "./assets/group-1349.png";
import { StyledRect } from "./_styles";
import { BannerTop } from "./content/BannerTop";
import { Community } from "./content/Community";
import { Tester } from "./content/Tester";
import { Reviews } from "./content/Reviews";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: false,
    tester_id: false,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

export default function Home() {
  const { user, error } = useUser();
  const [isLoading, setisLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [loadingMessage, setLoadingMessage] = useState(t("Loading"));

  const redirectUrl =
    i18n.language === "en" ? "/my-dashboard/" : "/it/la-mia-dashboard/";
  TagManager.dataLayer(tagManagerArgs);

  const helmet = (
    <Helmet>
      <title>{t("Home")} - AppQuality Crowd</title>
      <meta property="og:title" content={t("home")} />
      <meta name="description" content={t("home")} />
    </Helmet>
  );

  useEffect(() => {
    if (user) {
      setLoadingMessage(t("Redirecting to your dashboard..."));
      window.location.href = redirectUrl;
    } else {
      if (error) {
        if (error.statusCode === 403) {
          setisLoading(false);
          // user logged out, proceed
        } else {
          alert(error.message);
        }
      }
    }
  }, [redirectUrl, t, user, error]);

  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [rx, setRx] = useState("100%");
  let containerRef = useRef<HTMLDivElement>(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  const callBack: IntersectionObserverCallback = (entries) => {
    if (entries[0]) setEntry(entries[0]);
  };
  useEffect(() => {
    const newRx = entry ? entry.intersectionRatio.valueOf() * 100 : 100;
    setRx(`${newRx.toString()}%`);
  }, [entry]);
  useEffect(() => {
    const observer = new IntersectionObserver(callBack, options);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  if (isLoading) {
    return (
      <>
        {helmet}
        <Container className="aq-py-3">
          <SpinnerWrapper>
            <Spinner />
            <Title size="xs" as="h5">
              {loadingMessage}
            </Title>
          </SpinnerWrapper>
        </Container>
      </>
    );
  }
  return (
    <>
      {helmet}
      <Container className="aq-pb-3">
        <section className="aq-my-4">
          <BSGrid>
            <BannerTop />
            <BSCol size="col-5">
              <div style={{ position: "relative" }}>
                <TopShape />
                <div
                  style={{
                    position: "absolute",
                    top: "120px",
                    left: "30px",
                  }}
                >
                  <img src={people} />
                  <div>{`boundingClientRect: ${entry?.boundingClientRect.top}`}</div>
                  <div>{`intersectionRatio: ${entry?.intersectionRatio.valueOf()}`}</div>
                </div>
              </div>
            </BSCol>
          </BSGrid>
        </section>
        <section className="aq-my-4 aq-text-center">
          <Community />
        </section>
        <section style={{ position: "relative" }} className="aq-my-4">
          <StyledRect ref={containerRef} rx={rx}>
            <MiddleRect />
          </StyledRect>
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Tester />
          </div>
        </section>
        <section className="aq-my-4 aq-text-center">
          <Title size="xl">Sei pronto a metterti in gioco?</Title>
          <Text
            className="aq-my-4"
            style={{
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            In AppQuality le sfide non mancheranno mai e ti sentirai subito
            parte di una Community dinamica e stimolante! Sali a bordo e
            guarderai con occhi diversi il mondo digitale intorno a te. Testare
            crea dipendenza!
          </Text>
          <Button type="success">Entra nel Team</Button>
        </section>
        <section className="aq-my-4 aq-text-center">
          <Reviews />
        </section>
      </Container>
    </>
  );
}
