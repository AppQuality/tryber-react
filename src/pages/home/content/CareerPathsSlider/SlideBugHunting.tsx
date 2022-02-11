import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import JoinInButton from "../JoinInButton";
import careerImageEN from "./assets/bug_hunter_en.svg";
import careerImageES from "./assets/bug_hunter_es.svg";
import careerImageIT from "./assets/bug_hunter_it.svg";
import GenericSlide, { TextBox } from "./GenericSlide";

const TextBoxOne = styled(TextBox)`
  bottom: 9%;
  left: 4%;
`;
const TextBoxTwo = styled(TextBox)`
  bottom: 14%;
  left: 52%;
`;
const Image = () => {
  const { i18n, t } = useTranslation();
  let translatedImage = careerImageEN;
  if (i18n.language == `it`) translatedImage = careerImageIT;
  if (i18n.language == `es`) translatedImage = careerImageES;

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
      <div className=" aq-mt-3">
        <Title size="xl" className="text-marker">
          {t("__HOME_CAROUSEL_TITLE_BUG MAX:40")}
        </Title>
        <Text className="aq-mb-2">
          {t("__HOME_CAROUSEL_PARAGAPH_BUG MAX:110")}
        </Text>
      </div>
      <JoinInButton>{t("__HOME_CAROUSEL_CTA_BUG MAX:25")}</JoinInButton>
      <Title size="s" className="text-marker disclaimer">
        {t("__HOME_CAROUSEL_SUBTITLE_BUG MAX:30")}
      </Title>
    </GenericSlide>
  );
};
