import { icons, Text, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import careerImage from "./assets/career-eh@2x.png";
import GenericSlide, { iconStyle, TextBox } from "./GenericSlide";
import JoinInButton from "./JoinInButton";

const TextBoxOne = styled(TextBox)`
  bottom: 12%;
  left: 6%;
`;
const TextBoxTwo = styled(TextBox)`
  bottom: 6%;
  left: 51%;
`;
const Image = () => {
  const { t } = useTranslation();
  return (
    <div style={{ position: "relative" }}>
      <img src={careerImage} alt="career ethical hacker" />
      <TextBoxOne>
        <icons.Bug style={iconStyle} />
        {t("Looks like this website could be more secure...")}
      </TextBoxOne>
      <TextBoxTwo>
        <icons.Bug style={iconStyle} />
        {t("I'll flag this as a site penetration issue.")}
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
