import { icons, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import careerImage from "./assets/career-ux@2x.png";
import GenericSlide, { iconStyle, TextBox } from "./GenericSlide";
import JoinInButton from "./JoinInButton";

const TextBoxOne = styled(TextBox)`
  bottom: 8%;
  left: 4%;
`;
const TextBoxTwo = styled(TextBox)`
  bottom: 12%;
  left: 51%;
`;
const Image = () => {
  const { t } = useTranslation();
  return (
    <div style={{ position: "relative" }}>
      <img src={careerImage} alt="career market research" />
      <TextBoxOne>
        <icons.Bug style={iconStyle} />
        {t("I think the journey could be thought out better in flow 2...")}
      </TextBoxOne>
      <TextBoxTwo>
        <icons.Bug style={iconStyle} />
        {t("Yes, I agree! It will be a bit confusing for the user there.")}
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
