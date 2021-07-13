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
import { useUser } from "../store/useUser";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import { ReactComponent as TopShape } from "./assets/rectangle-top.svg";
import { ReactComponent as MiddleRect } from "./assets/rectangle-985.svg";
import people from "./assets/group-1349.png";
import { Alarm } from "react-bootstrap-icons";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: false,
    tester_id: false,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

export default function GettingStarted() {
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
        <section className="aq-my-4 aq-text-center">
          <BSGrid>
            <BSCol size="col-7">
              <PageTitle>
                <Title size="xl">
                  Entra nella prima Community di Tester italiana!
                </Title>
              </PageTitle>
              <Text>
                Ti è mai capitato di navigare su internet con il tuo smartphone
                o il computer e imbatterti in un’app o un sito web poco
                intuitivo o con errori? Con AppQuality{" "}
                <strong>
                  avrai l'opportunità di utilizzare servizi e app di grandi
                  aziende
                </strong>
                , segnalare i comportamenti anomali che riscontri e migliorare
                l'esperienza offerta all'utente.
                <strong>I tuoi feedback e il tuo lavoro sono preziosi!</strong>
              </Text>
              <Button type="success">Registrati Ora!</Button>
            </BSCol>
            <BSCol size="col-5">
              <div ref={containerRef} style={{ position: "relative" }}>
                <TopShape />
                <div
                  style={{
                    position: "absolute",
                    top: "120px",
                    left: "30px",
                    color: "#FFF",
                    fontSize: "24px",
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
          <Title size="l">La nostra community</Title>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "90px",
                  height: "100px",
                  backgroundColor: "grey",
                }}
              ></div>
              <div>
                <Title size="m">25.000+</Title>
                <strong>tester</strong>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "90px",
                  height: "100px",
                  backgroundColor: "grey",
                }}
              ></div>
              <div>
                <Title size="m">25.000+</Title>
                <strong>dispositivi</strong>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "90px",
                  height: "100px",
                  backgroundColor: "grey",
                }}
              ></div>
              <div>
                <Title size="m">2.500+</Title>
                <strong>campagne di test</strong>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "90px",
                  height: "100px",
                  backgroundColor: "grey",
                }}
              ></div>
              <div>
                <Title size="m">150.000+</Title>
                <strong>bug scovati</strong>
              </div>
            </div>
          </div>
        </section>
        <section style={{ position: "relative" }} className="aq-my-4">
          <MiddleRect />
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Title size="xl" className="aq-text-center">
              Perché diventare un tester AppQuality?
            </Title>
            <div
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "314px", padding: "30px" }}>
                <Card>
                  <Alarm />
                  <Text color="success">
                    <strong>Gestisci il tuo tempo</strong>
                  </Text>
                  <Text>
                    <strong>Testa quando e dove vuoi</strong>
                  </Text>
                  <Text>
                    L’importante è rispettare la data di chiusura della Campagna
                    di Test
                  </Text>
                </Card>
              </div>
              <div style={{ width: "314px", padding: "30px" }}>
                <Card>
                  <Alarm />
                  <Text color="success">
                    <strong>Gestisci il tuo tempo</strong>
                  </Text>
                  <Text>
                    <strong>Testa quando e dove vuoi</strong>
                  </Text>
                  <Text>
                    L’importante è rispettare la data di chiusura della Campagna
                    di Test
                  </Text>
                </Card>
              </div>
              <div style={{ width: "314px", padding: "30px" }}>
                <Card>
                  <Alarm />
                  <Text color="success">
                    <strong>Gestisci il tuo tempo</strong>
                  </Text>
                  <Text>
                    <strong>Testa quando e dove vuoi</strong>
                  </Text>
                  <Text>
                    L’importante è rispettare la data di chiusura della Campagna
                    di Test
                  </Text>
                </Card>
              </div>
              <div style={{ width: "314px", padding: "30px" }}>
                <Card>
                  <Alarm />
                  <Text color="success">
                    <strong>Gestisci il tuo tempo</strong>
                  </Text>
                  <Text>
                    <strong>Testa quando e dove vuoi</strong>
                  </Text>
                  <Text>
                    L’importante è rispettare la data di chiusura della Campagna
                    di Test
                  </Text>
                </Card>
              </div>
              <div style={{ width: "314px", padding: "30px" }}>
                <Card>
                  <Alarm />
                  <Text color="success">
                    <strong>Gestisci il tuo tempo</strong>
                  </Text>
                  <Text>
                    <strong>Testa quando e dove vuoi</strong>
                  </Text>
                  <Text>
                    L’importante è rispettare la data di chiusura della Campagna
                    di Test
                  </Text>
                </Card>
              </div>
              <div style={{ width: "314px", padding: "30px" }}>
                <Card>
                  <Alarm />
                  <Text color="success">
                    <strong>Gestisci il tuo tempo</strong>
                  </Text>
                  <Text>
                    <strong>Testa quando e dove vuoi</strong>
                  </Text>
                  <Text>
                    L’importante è rispettare la data di chiusura della Campagna
                    di Test
                  </Text>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="aq-my-4 aq-text-center">
          <Title size="xl">Sei pronto a metterti in gioco?</Title>
          <Text>
            In AppQuality le sfide non mancheranno mai e ti sentirai subito
            parte di una Community dinamica e stimolante! Sali a bordo e
            guarderai con occhi diversi il mondo digitale intorno a te. Testare
            crea dipendenza!
          </Text>
          <Button type="success">Entra nel Team</Button>
        </section>
        <section className="aq-my-4 aq-text-center">
          <Title size="xl" className="aq-text-center">
            I consigli dei nostri tester
          </Title>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "314px", padding: "30px" }}>
              <Card>
                <Alarm />
                <Text color="success">
                  <strong>Gestisci il tuo tempo</strong>
                </Text>
                <Text>
                  <strong>Testa quando e dove vuoi</strong>
                </Text>
                <Text>
                  L’importante è rispettare la data di chiusura della Campagna
                  di Test
                </Text>
              </Card>
            </div>
            <div style={{ width: "314px", padding: "30px" }}>
              <Card>
                <Alarm />
                <Text color="success">
                  <strong>Gestisci il tuo tempo</strong>
                </Text>
                <Text>
                  <strong>Testa quando e dove vuoi</strong>
                </Text>
                <Text>
                  L’importante è rispettare la data di chiusura della Campagna
                  di Test
                </Text>
              </Card>
            </div>
            <div style={{ width: "314px", padding: "30px" }}>
              <Card>
                <Alarm />
                <Text color="success">
                  <strong>Gestisci il tuo tempo</strong>
                </Text>
                <Text>
                  <strong>Testa quando e dove vuoi</strong>
                </Text>
                <Text>
                  L’importante è rispettare la data di chiusura della Campagna
                  di Test
                </Text>
              </Card>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
