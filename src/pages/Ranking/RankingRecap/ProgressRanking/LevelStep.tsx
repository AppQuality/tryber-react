import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import styled from "styled-components";
import { Text } from "@appquality/appquality-design-system";

const StyledLevelStep = styled.div<{
  color: string;
  isBig?: boolean;
  isOn?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0.8;
  position: relative;
  color: ${(p) => (p.isOn ? p.color : p.theme.colors.gray400)};
  &:not(:last-child) {
    margin-left: 0.75em;
  }

  .level-step-name {
    color: ${(p) =>
      p.isOn ? p.theme.palette.primary : p.theme.colors.gray400};
    margin-top: 0;
    margin-left: ${(p) => p.theme.grid.sizes[2]};
  }

  .level-step-icon {
    z-index: 1;
    display: inline-block;
    width: ${(p) => (p.isBig ? "3em" : "1.5em")};
    height: ${(p) => (p.isBig ? "3em" : "1.5em")};
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .level-step-subtitle {
    height: 2.1em;
    color: ${(p) => p.theme.colors.gray400};
    font-size: ${(p) => p.theme.typography.fontSize.small};
    font-weight: ${(p) => p.theme.typography.fontWeight.normal};
    position: absolute;
    top: 40px;
    left: 43%;
    width: 10em;
    text-align: left;
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    flex-direction: column;

    &:not(:last-child) {
      margin-left: 0;
    }

    .level-step-name {
      margin-top: ${(p) => p.theme.grid.sizes[2]};
      margin-left: 0;
    }
    .level-step-subtitle {
      width: auto;
      top: unset;
      left: unset;
      position: relative;
      line-height: 1.1;
      text-align: center;
      margin-top: 0.5em;
    }
  }
`;

interface LevelStepProps {
  level: ApiComponents["schemas"]["MonthlyLevel"];
  subtitle?: string;
  className?: string;
  color?: "main" | "background1" | "background2" | "textColor";
  isBig?: boolean;
  isOn?: boolean;
}

export const LevelStep = ({
  level,
  className,
  color = "main",
  isBig,
  isOn,
  subtitle,
}: LevelStepProps) => {
  return (
    <StyledLevelStep
      className={className}
      color={rankingTheme[level.id][color]}
      isOn={isOn}
      isBig={isBig}
    >
      <div className="level-step-icon">{rankingTheme[level.id].icon}</div>
      <Text className="level-step-name">{level.name}</Text>
      <Text className="level-step-subtitle">{subtitle}</Text>
    </StyledLevelStep>
  );
};
