import { Text } from "@appquality/appquality-design-system";
import styled from "styled-components";

const StyledExperience = styled.div<{ alignTop?: boolean }>`
  display: flex;
  ${(p) => (p.alignTop ? "align-items: flex-start;" : "")}
  img {
    margin-right: 0.5em;
  }
  .small-icon {
    width: 14px;
    height: 14px;
  }
  .value {
    font-weight: ${(p) => p.theme.typography.fontWeight.medium};
    margin-right: 0.5em;
  }
`;

interface ExperienceProps {
  icon: string;
  alt: string;
  value?: string;
  description?: string;
  small?: boolean;
  alignTop?: boolean;
}

export const Experience = ({
  icon,
  alt,
  value,
  description,
  small,
  alignTop,
}: ExperienceProps) => {
  return (
    <StyledExperience className="aq-mb-2" alignTop={alignTop}>
      <img className={small ? "small-icon" : ""} src={icon} alt={alt} />
      {value && (
        <Text className="value" small={small}>
          {value}
        </Text>
      )}
      {description && (
        <Text className="description" small={small}>
          {description}
        </Text>
      )}
    </StyledExperience>
  );
};
