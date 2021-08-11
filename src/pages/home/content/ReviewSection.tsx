import { Title } from "@appquality/appquality-design-system";
import { StyledSection } from "../_styles";
import { ReactComponent as MiddleRect } from "../assets/rectangle-985.svg";
import { Reviews } from "./Reviews";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { StyledRectProps } from "../_types";
import { useTranslation } from "react-i18next";

const StyledRect = styled.div(
  ({ rx }: StyledRectProps) => `
    position: absolute;
    top: -300px;
    right: -420px;
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

export const ReviewSection = () => {
  const { t } = useTranslation();
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
      <Title size="xl" className="aq-text-center section-title-wrapper aq-mb-4">
        {t("Our Testers’ advices")}
      </Title>
      <StyledRect className="hero" ref={ref} rx={rx}>
        <MiddleRect />
      </StyledRect>
      <div className="section-content-wrapper aq-pt-3">
        <Reviews />
      </div>
    </StyledSection>
  );
};
