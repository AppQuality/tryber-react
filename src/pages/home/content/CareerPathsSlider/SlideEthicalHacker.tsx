import { Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import JoinInButton from "../JoinInButton";
import careerImageEN from "./assets/ethical_hacker_en.svg";
import careerImageES from "./assets/ethical_hacker_es.svg";
import careerImageIT from "./assets/ethical_hacker_it.svg";
import GenericSlide, { TextBox } from "./GenericSlide";

const TextBoxOne = styled(TextBox)`
  bottom: 12%;
  left: 6%;
`;
const TextBoxTwo = styled(TextBox)`
  bottom: 6%;
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
        alt="career ethical hacker"
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
          {t("BECOME AN ETHICAL HACKER!")}
        </Title>
        <Text className="aq-mb-2">
          {t(
            "A user who will pursue a cyber security career inside the TRYBER Community. That means you will be specialized in Penetration Testing and Bug Bounty Testing and searching for security vulnerabilities."
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
