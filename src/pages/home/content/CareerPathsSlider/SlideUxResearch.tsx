import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import JoinInButton from "../JoinInButton";
import careerImageEN from "./assets/ux_tester_en.svg";
import careerImageES from "./assets/ux_tester_es.svg";
import careerImageIT from "./assets/ux_tester_it.svg";
import GenericSlide, { TextBox } from "./GenericSlide";

const TextBoxOne = styled(TextBox)`
  bottom: 8%;
  left: 4%;
`;
const TextBoxTwo = styled(TextBox)`
  bottom: 12%;
  left: 51%;
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
          {t("BECOME A UX TESTER!")}
        </Title>
        <Text className="aq-mb-2">
          {t(
            "A user who will pursue a user experience testing career inside the TRYBER Community. That means he will be specialized in Thinking Aloud Testing, Moderated Interview Testing and Usability Testing."
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
