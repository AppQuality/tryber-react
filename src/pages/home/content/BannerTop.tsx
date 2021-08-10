import {
  BSCol,
  BSGrid,
  Button,
  PageTitle,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as TopShape } from "../assets/rectangle-top.svg";
import people from "../assets/join-the-community.svg";
import styled from "styled-components";
import { StyledCta } from "../_styles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from "react-i18next";

const LangMenu = styled.div`
  color: ${(props) => props.theme.palette.primary};
  text-align: right;
  .lang-navLink {
    color: ${(props) => props.theme.palette.info};
    &.current {
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
    right: -450px;
    will-change: transform;
  }
  img {
    position: absolute;
    top: 50px;
    right: 10px;
  }
  .image-animation-enter {
    animation: swipe-in 350ms forwards;
  }
  .shape-animation-enter {
    transform: translate3d(100%, 0, 0);
    transition: transform 500ms ease-in-out;
  }
  .shape-animation-enter-active {
    transform: translate3d(0, 0, 0);
  }
  .top-animation-exit {
  }
  @keyframes swipe-in {
    0% {
      transform: translate3d(100%, 0, 0) skew(-60deg, 0);
    }
    40% {
      transform: translate3d(0, 0, 0) skew(0, 0);
    }
    70% {
      transform: translate3d(-10%, 0, 0) skew(10deg, 0);
    }
    100% {
      transform: translate3d(0, 0, 0) skew(0, 0);
    }
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
    // console.log(bottomDistance);
    setBottomDistance(entry?.boundingClientRect?.bottom || 0);
    //return () => window.removeEventListener('scroll', onScroll);
  }, [entry]);
  useEffect(() => {
    setTimeout(() => {
      setShapeVisible(true);
    }, 500);
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
      <BSCol size="col-lg-7">
        <div style={{ position: "relative" }}>
          <PageTitle>
            <Title size="xl">
              {t("Join the first italian tester comunity!")}
            </Title>
          </PageTitle>
          <Text className="aq-mb-3 large-desktop">
            Ti è mai capitato di navigare su internet con il tuo smartphone o il
            computer e imbatterti in un’app o un sito web poco intuitivo o con
            errori?
          </Text>
          <Text className="aq-mb-4 large-desktop">
            Con AppQuality `
            <strong>
              avrai l'opportunità di utilizzare servizi e app di grandi aziende
            </strong>
            , segnalare i comportamenti anomali che riscontri e migliorare
            l'esperienza offerta all'utente.
            <br />
            <strong>I tuoi feedback e il tuo lavoro sono preziosi!</strong>
          </Text>
          <StyledCta>
            <Button
              as="a"
              href={`${window.location.href}/getting-started`}
              type="success"
              size="block"
            >
              {t("join the team")}
            </Button>
          </StyledCta>
        </div>
      </BSCol>
      <BSCol size="col-lg-5">
        <TopAnimation className="hero" ref={containerRef}>
          <TransitionGroup classNames="top-animation">
            {shapeIsVisible && (
              <CSSTransition
                key="shape-animation"
                timeout={500}
                classNames="shape-animation"
              >
                <TopShape
                  className="top-shape"
                  style={{
                    transform: `translate3d(0, ${bottomDistance - 607}px, 0)
                              rotate(calc(${bottomDistance - 607}deg * -0.1)`,
                  }}
                />
              </CSSTransition>
            )}
            <img className="top-image" src={people} />
          </TransitionGroup>
        </TopAnimation>
      </BSCol>
    </BSGrid>
  );
};
