import { Card, Text } from "@appquality/appquality-design-system";
import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import clock from "src/pages/home/assets/clock.svg";
import devices from "src/pages/home/assets/devices.svg";
import diamond from "src/pages/home/assets/diamond.svg";
import hands from "src/pages/home/assets/hands.svg";
import support from "src/pages/home/assets/support.svg";
import wallet from "src/pages/home/assets/wallet.svg";
import styled, { keyframes } from "styled-components";

const tresholdForCardAnimation = 100;

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
export const WhyJoinTryber = () => {
  const { t } = useTranslation();
  const items = [
    {
      icon: wallet,
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
      icon: devices,
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
      icon: hands,
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
      icon: clock,
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
      icon: diamond,
      title: t("grow your experience"),
      body: t(
        "Each Test you take will allow you to increase your skills and hone your tester abilities."
      ),
    },
    {
      icon: support,
      title: t("constant support"),
      body: (
        <Trans
          i18nKey="<bold>A Team of competent and professional figures</bold> will always be at your side to resolve any doubts <br></br>you may have"
          defaults="<bold>A Team of competent and professional figures</bold> will always be at your side to resolve any doubts <br></br>you may have"
          components={{ br: <br />, bold: <strong /> }}
        />
      ),
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
  );
};
