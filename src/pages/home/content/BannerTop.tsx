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
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TopAnimation = styled.div`
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
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [shapeIsVisible, setShapeVisible] = useState(false);
  const [imgIsVisible, setImgVisible] = useState(false);
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
    setTimeout(() => {
      setImgVisible(true);
    }, 1100);
  }, []);
  return (
    <BSGrid>
      <BSCol size="col-lg-7">
        <div style={{ position: "relative", zIndex: 2 }}>
          <PageTitle>
            <Title size="xl">
              Entra nella prima Community di Tester italiana!
            </Title>
          </PageTitle>
          <Text className="aq-my-4">
            Ti è mai capitato di navigare su internet con il tuo smartphone o il
            computer e imbatterti in un’app o un sito web poco intuitivo o con
            errori?{" "}
          </Text>
          <Text>
            Con AppQuality
            <strong>
              avrai l'opportunità di utilizzare servizi e app di grandi aziende
            </strong>
            , segnalare i comportamenti anomali che riscontri e migliorare
            l'esperienza offerta all'utente.
            <strong>I tuoi feedback e il tuo lavoro sono preziosi!</strong>
          </Text>
          <Button type="success" className="aq-my-4">
            Registrati Ora!
          </Button>
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
            {imgIsVisible && (
              <CSSTransition
                key="img-animation"
                timeout={350}
                classNames="image-animation"
              >
                <img className="top-image" src={people} />
              </CSSTransition>
            )}
          </TransitionGroup>
        </TopAnimation>
      </BSCol>
    </BSGrid>
  );
};
