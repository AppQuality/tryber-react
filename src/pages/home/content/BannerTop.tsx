import {
  BSCol,
  BSGrid,
  PageTitle,
  Text,
  Title,
} from "@appquality/appquality-design-system";
import React, { useEffect, useRef, useState } from "react";
import people from "../assets/tryber_home_welcome.png";
import { LangMenu } from "../../../features/LangMenu";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import JoinTheTeamButton from "./JoinTheTeamButton";

const StyledWrapper = styled.div`
  position: relative;
  overflow: visible;
  max-width: 100%;
  .welcome-img {
    float: right;
    width: 200px;
    margin: 50px -40px 20px 20px;
    shape-outside: ellipse(100px 100px at 90% 70%);
    @media only screen and (min-width: ${(props) =>
        props.theme.grid.breakpoints.lg}) {
      width: 540px;
      margin: 16px;
      shape-outside: none;
    }
  }
`;

export const BannerTop = () => {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <img className="welcome-img" src={people} alt="tryber welcome people" />
      <div className="text-marker section-title aq-text-secondary aq-mb-4">
        {t("Join the AppQuality Tester Community!")}
      </div>
      <Text className="aq-mb-4 large-desktop">
        <div className="aq-mb-2">
          {t(
            "Have you ever surfed the internet with your smartphone or computer and come across an app or website that is unintuitive or has errors?"
          )}
        </div>
        <Trans
          i18nKey={
            "With AppQuality you will <2>have the opportunity to use services and apps of big companies</2>, report anomalous behaviors that you find and improve the experience offered to the user.<4></4><5>Your feedback and work are valuable!</5>"
          }
        >
          With AppQuality you will{" "}
          <strong>
            have the opportunity to use services and apps of big companies
          </strong>
          , report anomalous behaviors that you find and improve the experience
          offered to the user.
          <br />
          <strong>Your feedback and work are valuable!</strong>
        </Trans>
      </Text>
      <JoinTheTeamButton />
    </StyledWrapper>
  );
};
