import { Title } from "@appquality/appquality-design-system";
import { StyledSection } from "../_styles";
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
import styled from "styled-components";
import { StyledRectProps } from "../_types";

const StyledRect = styled.div(
  ({ rx }: StyledRectProps) => `
    position: absolute;
    top: -80px;
    left: -80px;
    svg {
      width: 530px;
      height: 740px;
      overflow: visible;
      rect {
        width: 530px;
        height: 530px;
        rx: ${rx};
      }
    }
  `
);

export const CardSection = () => {
  const { t } = useTranslation();
  const cardListItems = [
    {
      icon: <Alarm />,
      title: t("flexible hours"),
      body: (
        <Trans
          i18nKey="<bold>Test when and where you want!</bold><br></br>The important thing is to respect the closing date of the Test Campaign"
          defaults="<bold>Test when and where you want!</bold><br></br>The important thing is to respect the closing date of the Test Campaign"
          components={{ br: <br />, bold: <strong /> }}
        />
      ),
    },
    {
      icon: <Laptop />,
      title: t("devices"),
      body: (
        <Trans
          i18nKey="To test you won't need special equipment, but simply  <bold>your own personal devices</bold>"
          defaults="To test you won't need special equipment, but simply  <bold>your own personal devices</bold>"
          components={{ bold: <strong /> }}
        />
      ),
    },
    {
      icon: <Eyeglasses />,
      title: t("free training"),
      body: (
        <Trans
          i18nKey="Don't know anything about testing?<br></br> Don't be afraid! We have for you <bold>Certificated Basic Courses</bold> and many training articles"
          defaults="Don't know anything about testing?<br></br> Don't be afraid! We have for you <bold>Certificated Basic Courses</bold> and many training articles"
          components={{ br: <br />, bold: <strong /> }}
        />
      ),
    },
    {
      icon: <Wallet2 />,
      title: t("fair payments"),
      body: (
        <Trans
          i18nKey="By successfully completing a Campaign <bold>you will receive a payout</bold>, which you can transfer to your IBAN or PayPal."
          defaults="By successfully completing a Campaign <bold>you will receive a payout</bold>, which you can transfer to your IBAN or PayPal."
          components={{ br: <br />, bold: <strong /> }}
        />
      ),
    },
    {
      icon: <GraphUp />,
      title: t("grow your experience"),
      body: t(
        "Each Test you take will allow you to increase your skills and hone your tester abilities."
      ),
    },
    {
      icon: <Headset />,
      title: t("constant support"),
      body: (
        <Trans
          i18nKey="<bold>A team of competent and professional figures</bold> will always be at your side to resolve any doubts you may have"
          defaults="<bold>A team of competent and professional figures</bold> will always be at your side to resolve any doubts you may have"
          components={{ br: <br />, bold: <strong /> }}
        />
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
    <StyledSection style={{ padding: "0 40px" }}>
      <Title size="xl" className="aq-text-center aq-mb-4 section-title-wrapper">
        {t("Why you should become an AppQuality tester?")}
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
