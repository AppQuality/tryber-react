import { Title } from "@appquality/appquality-design-system";
import { StyledRect, StyledSection } from "../_styles";
import { ReactComponent as MiddleRect } from "../assets/rectangle-985.svg";
import { Reviews } from "./Reviews";
import React from "react";

export const ReviewSection = () => {
  return (
    <StyledSection>
      <Title size="xl" className="aq-text-center section-title-wrapper">
        I consigli dei nostri tester
      </Title>
      <StyledRect className="hero" rx="20%">
        <MiddleRect />
      </StyledRect>
      <div className="section-content-wrapper">
        <Reviews />
      </div>
    </StyledSection>
  );
};
