import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import JoinInButton from "../_components/JoinInButton";
import careerImageEN from "./assets/ux_tester_en.svg";
import careerImageES from "./assets/ux_tester_es.svg";
import careerImageIT from "./assets/ux_tester_it.svg";
import GenericSlide, { TextBox } from "./GenericSlide";

const Image = () => {
  const { i18n } = useTranslation();
  let translatedImage = careerImageEN;
  if (i18n.language === `it`) translatedImage = careerImageIT;
  if (i18n.language === `es`) translatedImage = careerImageES;

  return (
    <div style={{ position: "relative" }}>
      <img
        src={translatedImage}
        className="aq-ml-2"
        alt="career market research"
      />
    </div>
  );
};

export default () => {
  const { t } = useTranslation();
  return (
    <GenericSlide image={<Image />}>
      <div className="aq-my-3">
        <Title size="xl" className="text-marker aq-mb-3">
          {t("__HOME_CAROUSEL_TITLE_UX MAX:40")}
        </Title>
        <Text className="aq-mb-2">
          {t("__HOME_CAROUSEL_PARAGAFO_UX MAX :110")}
        </Text>
      </div>
      <div>
        <JoinInButton>{t("__HOME_CAROUSEL_CTA_UX MAX:25")}</JoinInButton>
        <Title size="s" className="text-marker disclaimer">
          {t("__HOME_CAROUSEL_SUBTITLE_UX MAX:30")}
        </Title>
      </div>
    </GenericSlide>
  );
};
