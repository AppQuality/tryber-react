import styled from "styled-components";
import { Text } from "@appquality/appquality-design-system";

const LanguageFlag = styled.img`
  max-width: 21px;
  height: auto;
`;
export const getLanguageMessage = (
  language: ApiOperations["get-users-me-campaigns-campaignId"]["responses"]["200"]["content"]["application/json"]["language"]
) => {
  if (!language) return null;
  return (
    <Text className="aq-mb-3">
      <LanguageFlag
        src={`https://s3.eu-west-1.amazonaws.com/appq.static/languages_flags/${language.code}.png`}
        alt={language.code}
      />{" "}
      {language.message}
    </Text>
  );
};
