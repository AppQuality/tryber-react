import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import styled from "styled-components";
import { Text } from "@appquality/appquality-design-system";

const StyledLevelStep = styled.div<{
  color: string;
  isLarge?: boolean;
  isOn?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.8;
  color: ${(p) => (p.isOn ? p.color : p.theme.colors.gray400)};

  .level-step-name {
    color: ${(p) =>
      p.isOn ? p.theme.palette.primary : p.theme.colors.gray400};
    margin-top: ${(p) => p.theme.grid.sizes[2]};
  }

  .level-step-icon {
    z-index: 1;
    display: inline-block;
    width: ${(p) => (p.isLarge ? "3em" : "1.5em")};
    height: ${(p) => (p.isLarge ? "3em" : "1.5em")};
    svg {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    flex-direction: row;
    &:not(:last-child) {
      margin-left: 0.75em;
    }
    .level-step-name {
      margin-top: 0;
      margin-left: ${(p) => p.theme.grid.sizes[2]};
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
  return (
    <StyledLevelStep
      className={className}
      color={rankingTheme[level.id][color]}
      isOn={isOn}
      isLarge={isLarge}
    >
      <div className="level-step-icon">{rankingTheme[level.id].icon}</div>
      <Text className="level-step-name">{level.name}</Text>
    </StyledLevelStep>
  );
};
