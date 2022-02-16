import { Card, Text } from "@appquality/appquality-design-system";
import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

import clock from "./assets/clock.svg";
import devices from "./assets/devices.svg";
import diamond from "./assets/diamond.svg";
import hands from "./assets/hands.svg";
import support from "./assets/support.svg";
import tryberCharacters5 from "./assets/Tryber_Why_Join.svg";
import wallet from "./assets/wallet.svg";

const bgSpaceSm = "55px";
const bgSpaceLg = "75px";

const tresholdForCardAnimation = 100;
const GradientDiv = styled.div`
  padding: ${bgSpaceSm} 0;
  background: linear-gradient(125.03deg, #a62ad3 3.24%, #f6cf39 101.35%);
  min-height: 600px;
  color: ${(props) => props.theme.colors.white};
  .section-title.text-marker {
    color: ${(props) => props.theme.colors.white};
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.lg}) {
    padding: ${bgSpaceLg} 0;
  }
  .tryber {
    display: block;
    width: 15%;
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.md}) {
      width: 10%;
    }
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      width: 5%;
    }
    margin: 0 auto;
  }
  ${Text}.subtitle {
    color: ${(props) => props.theme.colors.white};
  }
`;
const slideUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(35px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardListStyle = styled.div`
  .aq-card-body ${Text} {
    color: ${(props) => props.theme.colors.white};
  }
  min-height: ${tresholdForCardAnimation + 1}px;
  @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 18px 40px;
  }
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 18px 50px;
    .card-list-item {
      padding-bottom: 35px;
    }
  }
  .item-icon {
    font-size: 40px;
  }
`;

const CardItem = styled(Card)<{ index: number }>`
  animation-duration: 0.5s;
  animation-delay: ${({ index }) => index * 0.2}s;
  animation-fill-mode: both;
  animation-name: ${slideUpAnimation};
  background: linear-gradient(
    120.58deg,
    rgba(141, 62, 133, 0.5) 0%,
    rgba(157, 94, 97, 0.1) 91.33%
  );
  border-radius: 32px;
  border: none;
  color: ${(props) => props.theme.colors.white};
`;
export default () => {
  const { t } = useTranslation();
  const items = [
    {
      icon: wallet,
      title: t("__HOME_TITLE_CARD_AWARDS  MAX:20"),
      body: <Trans i18nKey="__HOME_PARAGRAPH_CARD_AWARDS MAX: 80" />,
    },
    {
      icon: devices,
      title: t("__HOME_TITLE_CARD_ACCESS MAX:20"),
      body: <Trans i18nKey="__HOME_PARAGRAFO_CARD_ACCESS MAX:80" />,
    },
    {
      icon: hands,
      title: t("__HOME_TITLE_CARD_COURSES MAX:20"),
      body: <Trans i18nKey="__HOME_PARAGRAFO_CARD_COURSES MAX:80" />,
    },
    {
      icon: clock,
      title: t("__HOME_TITLE_CARD_TIME MAX:20"),
      body: <Trans i18nKey="__HOME_PARAGRAPH_CARD_TIME MAX:80" />,
    },
    {
      icon: diamond,
      title: t("__HOME_TITLE_CARD_SKILL MAX:20"),
      body: <Trans i18nKey="__HOME_PARAGRAPH_CARD_SKILL MAX:80" />,
    },
    {
      icon: support,
      title: t("__HOME_TITLE_CARD_SUPPORT MAX:20"),
      body: <Trans i18nKey="__HOME_PARAGRAPH_CARD_SUPPORT MAX:80" />,
    },
  ];
  const [isVisible, setIsVisible] = useState(false);
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
  useEffect(() => {
    if (
      !isVisible &&
      entry &&
      entry.intersectionRect.height > tresholdForCardAnimation
    ) {
      setIsVisible(true);
    }
  }, [entry]);
  return (
    <GradientDiv>
      <div className="text-marker aq-text-center aq-mb-4 section-title container">
        <img
          className="tryber"
          src={tryberCharacters5}
          alt="tryber characters"
        />
        <span>{t("__HOME_TITLE_WHY MAX:40 ")}</span>
      </div>
      <Text className="aq-text-center aq-mb-4 subtitle container">
        {t("__HOME_PARAGRAPH_WHY MAX:110")}
      </Text>
      <div className="container">
        <CardListStyle ref={ref} className="aq-text-center">
          {isVisible &&
            items.map((item, index) => (
              <CardItem
                index={index + 1}
                key={index}
                className="card-list-item aq-my-3"
              >
                <div className="item-icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                <Text className="aq-mb-3 capitalize-first">
                  <strong>{item.title}</strong>
                </Text>
                <Text>{item.body}</Text>
              </CardItem>
            ))}
        </CardListStyle>
      </div>
    </GradientDiv>
  );
};
