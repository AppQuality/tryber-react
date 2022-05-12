import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Text } from "@appquality/appquality-design-system";

const StyledLevelStep = styled.div<{
  color: string;
  isLarge?: boolean;
  isOn?: boolean;
}>`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(p) => (p.isOn ? p.color : p.theme.colors.gray400)};

  .level-step-name {
    color: ${(p) =>
      p.isOn ? p.theme.palette.primary : p.theme.colors.gray400};
    margin-top: ${(p) => p.theme.grid.sizes[2]};
  }

  .level-step-icon {
    display: inline-block;
    width: ${(p) => (p.isLarge ? "3rem" : "1.5rem")};
    height: ${(p) => (p.isLarge ? "3rem" : "1.5rem")};
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

interface LevelStepProps {
  level: ApiComponents["schemas"]["MonthlyLevel"];
  className?: string;
  color?: "main" | "background1" | "background2" | "textColor";
  isLarge?: boolean;
  isOn?: boolean;
}

export const LevelStep = ({
  level,
  className,
  color = "main",
  isLarge,
  isOn,
}: LevelStepProps) => {
  const [levelColor, setColor] = useState("");
  useEffect(() => {
    setColor(rankingTheme[level.id][color]);
  }, [level, color]);

  return (
    <StyledLevelStep
      className={className}
      color={levelColor}
      isOn={isOn}
      isLarge={isLarge}
    >
      <div className="level-step-icon">{rankingTheme[level.id].icon}</div>
      <Text className="level-step-name">{level.name}</Text>
    </StyledLevelStep>
  );
};
