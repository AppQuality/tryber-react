import {
  BSCol,
  BSGrid,
  PageTitle,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as TopShape } from "../assets/rectangle-top.svg";
import people from "../assets/join-the-community.svg";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { Trans, useTranslation } from "react-i18next";
import JoinTheTeamButton from "./JoinTheTeamButton";

const LangMenu = styled.div`
  color: ${(props) => props.theme.palette.primary};
  min-height: 24px;
  text-align: right;
  .lang-navLink {
    color: ${(props) => props.theme.palette.info};
    &.current {
      font-weight: ${(props) =>
        props.theme.typography.fontWeight.bold.toString()};
      text-decoration: none;
      cursor: default;
      pointer-events: none;
    }
  }
`;
const TopAnimation = styled.div`
  display: none;
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    display: block;
  }
  position: relative;
  height: 500px;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
    @media (min-width: ${(props) => props.theme.grid.breakpoints.xl}) {
      top: 25px;
    }
  }
  img {
    position: absolute;
    top: 110px;
    right: -50px;
  }
  .shape-animation-container {
    position: relative;
    will-change: transform;
    transition: all 500ms ease-in-out;
    transform: translate3d(200%, 0, 0);
  }
  .shape-animation-enter.shape-animation-enter-active {
    transform: translate3d(0, 0, 0);
  }
  .shape-animation-enter-done {
    transform: translate3d(0, 0, 0);
  }
`;

export const BannerTop = () => {
  const { t, i18n } = useTranslation();
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [bottomDistance, setBottomDistance] = useState(0);
  const [shapeIsVisible, setShapeVisible] = useState(false);
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
  useEffect(() => {
    setBottomDistance(entry?.boundingClientRect?.bottom || 0);
  }, [entry]);
  useEffect(() => {
    setTimeout(() => {
      setShapeVisible(true);
    }, 300);
  }, []);
  return (
    <BSGrid>
      <LangMenu className="aq-mb-3">
        <a
          href="/it"
          className={`${i18n.language === "it" ? "current " : ""}lang-navLink`}
        >
          Italiano
        </a>{" "}
        |{" "}
        <a
          href="/"
          className={`${i18n.language === "en" ? "current " : ""}lang-navLink`}
        >
          English
        </a>
      </LangMenu>
      <BSCol size="col-lg-7 col-xxl-8">
        <div style={{ position: "relative" }}>
          <PageTitle>
            <Title size="xl">
              {t("Join the AppQuality Tester Community!")}
            </Title>
          </PageTitle>
          <Text className="aq-mb-3 large-desktop">
            {t(
              "Have you ever surfed the internet with your smartphone or computer and come across an app or website that is unintuitive or has errors?"
            )}
          </Text>
          <Text className="aq-mb-4 large-desktop">
            <Trans
              i18nKey={
                "With AppQuality you will <2>have the opportunity to use services and apps of big companies</2>, report anomalous behaviors that you find and improve the experience offered to the user.<4></4><5>Your feedback and work are valuable!</5>"
              }
            >
              With AppQuality you will{" "}
              <strong>
                have the opportunity to use services and apps of big companies
              </strong>
              , report anomalous behaviors that you find and improve the
              experience offered to the user.
              <br />
              <strong>Your feedback and work are valuable!</strong>
            </Trans>
          </Text>
          <JoinTheTeamButton />
        </div>
      </BSCol>
      <BSCol size="col-lg-5 col-xxl-4">
        <TopAnimation ref={containerRef}>
          <CSSTransition
            in={shapeIsVisible}
            key="shape-animation"
            timeout={500}
            classNames="shape-animation"
          >
            <div className="shape-animation-container">
              <TopShape
                className="top-shape"
                style={{
                  transform: `translate3d(0, ${bottomDistance - 607}px, 0)
                          rotate(calc(${bottomDistance - 607}deg * -0.1)`,
                }}
              />
            </div>
          </CSSTransition>
          <img className="top-image" src={people} />
        </TopAnimation>
      </BSCol>
    </BSGrid>
  );
};
