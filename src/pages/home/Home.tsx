import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Spinner,
  SpinnerWrapper,
  Title,
  Button,
  Text,
} from "@appquality/appquality-design-system";
import { Trans, useTranslation } from "react-i18next";
import { useUser } from "../../store/useUser";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";
import { ReactComponent as MiddleRect } from "./assets/rectangle-985.svg";
import testerIcon from "./assets/testers.svg";
import campaignsIcon from "./assets/campaigns.svg";
import devicesIcon from "./assets/devices.svg";
import bugsIcon from "./assets/bugs.svg";
import { StyledRect } from "./_styles";
import { BannerTop } from "./content/BannerTop";
import { DataList } from "./content/DataList";
import { CardList } from "./content/CardList";
import { Reviews } from "./content/Reviews";
import { DataListItem } from "./_types";
import {
  Alarm,
  Headset,
  Wallet2,
  Laptop,
  Eyeglasses,
  GraphUp,
} from "react-bootstrap-icons";

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

  const cardListItems = [
    {
      icon: <Alarm />,
      title: t("manage your time"),
      body: (
        <Trans i18nKey="<0>Testa quando e dove vuoi!</0><1></1>L’importante è rispettare la data di chiusura della Campagna di Test">
          <strong>Testa quando e dove vuoi!</strong>
          <br />
          L’importante è rispettare la data di chiusura della Campagna di Test
        </Trans>
      ),
    },
    {
      icon: <Laptop />,
      title: t("devices"),
      body: (
        <Trans i18nKey="Per testare non avrai bisogno di attrezzature speciali, ma semplicemente dei <1>tuoi dispositivi personali</1>">
          Per testare non avrai bisogno di attrezzature speciali, ma
          semplicemente dei <strong>tuoi dispositivi personali</strong>
        </Trans>
      ),
    },
    {
      icon: <Eyeglasses />,
      title: t("formazione gratuita"),
      body: (
        <Trans i18nKey="Non sai nulla di test? Non temere! Abbiamo per te dei <1></1><3>Corsi Base con attestato</3> e tanti articoli formativi ">
          Non sai nulla di test?
          <br />
          Non temere! Abbiamo per te dei{" "}
          <strong>Corsi Base con attestato</strong> e tanti articoli formativi
        </Trans>
      ),
    },
    {
      icon: <Wallet2 />,
      title: t("pagamenti sicuri"),
      body: (
        <Trans i18nKey="Completando correttamente una Campagna <1>riceverai un payout</>, che potrai trasferire sul tuo IBAN o PayPal">
          Completando correttamente una Campagna{" "}
          <strong>riceverai un payout</strong>, che potrai trasferire sul tuo
          IBAN o PayPal
        </Trans>
      ),
    },
    {
      icon: <GraphUp />,
      title: t("migliora ogni giorno"),
      body: (
        <Trans i18nKey="<0>Testa quando e dove vuoi!</0><1></1> L’importante è rispettare la data di chiusura della Campagna di Test">
          <strong>Testa quando e dove vuoi!</strong>
          <br />
          L’importante è rispettare la data di chiusura della Campagna di Test
        </Trans>
      ),
    },
    {
      icon: <Headset />,
      title: t("supporto costante"),
      body: (
        <Trans i18nKey="<0>Un Team di figure competenti</0> e professionali sarà sempre al tuo fianco per risolvere ogni tuo dubbio">
          <strong>Un Team di figure competenti</strong> e professionali sarà
          sempre al tuo fianco per risolvere ogni tuo dubbio
        </Trans>
      ),
    },
  ];
  //const [middleRectRef, middleRectEntry] = useObserver<HTMLDivElement>();
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  let ref = useRef<HTMLDivElement>(null);

  const callBack: IntersectionObserverCallback = (entries) => {
    if (entries[0]) setEntry(entries[0]);
  };
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callBack, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);
  const [rx, setRx] = useState("100%");
  useEffect(() => {
    if (entry?.intersectionRect.top) {
      const top =
        entry?.intersectionRect.top > 20 ? entry?.intersectionRect.top : 20;
      const newRx = entry
        ? (top / (entry?.target.clientHeight - 200)) * 100
        : 100;
      setRx(`${newRx.toString()}%`);
    }
  }, [entry]);

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
          <BannerTop />
        </section>
        <section className="aq-my-4 aq-text-center">
          <Title size="l" className="aq-my-4">
            La nostra community
          </Title>
          <DataList data={communityData} />
        </section>
        <section
          style={{ position: "relative", height: "700px" }}
          className="aq-my-4"
        >
          <Title size="xl" className="aq-text-center">
            Perché diventare un tester AppQuality?
          </Title>
          <StyledRect className="hero" ref={ref} rx={rx}>
            <MiddleRect />
          </StyledRect>
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <CardList items={cardListItems} />
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
