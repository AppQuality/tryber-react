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

export const BannerTop = () => {
  const { t } = useTranslation();

  return (
    <BSGrid>
      <LangMenu className="aq-mb-3" itLink="/it" enLink="/" esLink="/es" />
      <BSCol size="col-lg-7 col-xxl-8">
        <div style={{ position: "relative" }}>
          <PageTitle>
            <Title size="xl" color="secondary" className="text-marker">
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
        <img src={people} alt="tryber welcome people" />
      </BSCol>
    </BSGrid>
  );
};
