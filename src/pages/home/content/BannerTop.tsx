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
import people from "../assets/group-1349.png";
import styled from "styled-components";
import { StyledCta } from "./../_styles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from "react-i18next";

const TopAnimation = styled.div`
  display: none;
  @media (min-width: 991px) {
    display: block;
  }
  position: relative;
  height: 500px;

  svg {
    position: absolute;
    top: 0;
    right: 0;
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
  const { t } = useTranslation();
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
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
    //console.log(entry?.intersectionRect.top);
  }, [entry]);
  useEffect(() => {
    setTimeout(() => {
      setShapeVisible(true);
    }, 500);
  }, []);
  return (
    <BSGrid>
      <BSCol size="col-lg-7">
        <div style={{ position: "relative" }}>
          <PageTitle>
            <Title size="xl">
              {t("Entra nella prima Community di Tester italiana!")}
            </Title>
          </PageTitle>
          <Text className="aq-mb-3">
            Ti è mai capitato di navigare su internet con il tuo smartphone o il
            computer e imbatterti in un’app o un sito web poco intuitivo o con
            errori?
          </Text>
          <Text className="aq-mb-4">
            Con AppQuality
            <strong>
              avrai l'opportunità di utilizzare servizi e app di grandi aziende
            </strong>
            , segnalare i comportamenti anomali che riscontri e migliorare
            l'esperienza offerta all'utente.
            <br />
            <strong>I tuoi feedback e il tuo lavoro sono preziosi!</strong>
          </Text>
          <StyledCta>
            <Button type="success" size="block" className="aq-mt-4">
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
                <TopShape className="top-shape" />
              </CSSTransition>
            )}
            <img className="top-image" src={people} />
          </TransitionGroup>
        </TopAnimation>
      </BSCol>
    </BSGrid>
  );
};
