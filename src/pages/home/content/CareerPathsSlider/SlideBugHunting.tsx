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
          {t("BECOME A BUG HUNTER!")}
        </Title>
        <Text className="aq-mb-2">
          {t(
            "A user who will pursue a functional testing career inside the TRYBER Community. That means you will be specialized in Functional Testing, Exploratory Testing and Bug Hunting."
          )}
        </Text>
      </div>
      <JoinInButton />
      <Title size="s" className="text-marker disclaimer">
        {t("Start earning today!")}
      </Title>
    </GenericSlide>
  );
};
