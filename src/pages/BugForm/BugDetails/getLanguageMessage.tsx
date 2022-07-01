import IT from "./assets/IT.png";
import EN from "./assets/GB.png";
import ES from "./assets/ES.png";
import styled from "styled-components";
import { Text } from "@appquality/appquality-design-system";

const LanguageFlag = styled.img`
  max-width: 21px;
  height: auto;
`;
export const getLanguageMessage = (
  language: ApiOperations["get-users-me-campaigns-campaignId"]["responses"]["200"]["content"]["application/json"]["language"]
) => {
  switch (language?.code) {
    case "IT":
      return (
        <Text className="aq-mb-3">
          <LanguageFlag src={IT} alt="it" /> {language?.message}
        </Text>
      );
    case "EN":
      return (
        <Text className="aq-mb-3">
          <LanguageFlag src={EN} alt="it" /> {language?.message}
        </Text>
      );
    case "ES":
      return (
        <Text className="aq-mb-3">
          <LanguageFlag src={ES} alt="it" /> {language?.message}
        </Text>
      );
    default:
      return null;
  }
};
