import { Title } from "@appquality/appquality-design-system";
import { StyledRect, StyledSection } from "../_styles";
import { ReactComponent as MiddleRect } from "../assets/rectangle-985.svg";
import React, { useEffect, useRef, useState } from "react";
import { CardList } from "./CardList";
import { Trans, useTranslation } from "react-i18next";
import {
  Alarm,
  Eyeglasses,
  GraphUp,
  Headset,
  Laptop,
  Wallet2,
} from "react-bootstrap-icons";

export const CardSection = () => {
  const { t } = useTranslation();
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
  return (
    <StyledSection>
      <Title size="xl" className="aq-text-center aq-mb-4 section-title-wrapper">
        {t("Why becoming an AppQuality tester?")}
      </Title>
      <StyledRect className="hero" ref={ref} rx={rx}>
        <MiddleRect />
      </StyledRect>
      <div className="section-content-wrapper">
        <CardList items={cardListItems} />
      </div>
    </StyledSection>
  );
};
