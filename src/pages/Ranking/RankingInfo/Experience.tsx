import { Text } from "@appquality/appquality-design-system";
import styled from "styled-components";

const StyledExperience = styled.div`
  display: flex;
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
}

export const Experience = ({
  icon,
  alt,
  value,
  description,
  small,
}: ExperienceProps) => {
  return (
    <StyledExperience className="aq-mb-2">
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
