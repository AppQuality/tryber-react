import { icons, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import JoinInButton from "../JoinInButton";
import careerImage from "./assets/career-bh@2x.png";
import GenericSlide, { iconStyle, TextBox } from "./GenericSlide";

const TextBoxOne = styled(TextBox)`
  bottom: 9%;
  left: 4%;
`;
const TextBoxTwo = styled(TextBox)`
  bottom: 14%;
  left: 52%;
`;
const Image = () => {
  const { t } = useTranslation();
  return (
    <div style={{ position: "relative" }}>
      <img src={careerImage} alt="career market research" />
      <TextBoxOne>
        <icons.Bug style={iconStyle} />
        {t("Hey, want to grab a coffee and do some bug hunting?")}
      </TextBoxOne>
      <TextBoxTwo>
        <icons.Bug style={iconStyle} />
        {t("Sounds great, I'll bring my laptop along!")}
      </TextBoxTwo>
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
