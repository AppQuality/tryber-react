import styled from "styled-components";
import { Text } from "@appquality/appquality-design-system";
import { Level } from "../Level";
import { Experience } from "./Experience";
import arrow from "./assets/arrow.svg";
import doubleArrow from "./assets/doubleArrow.svg";
import { useTranslation } from "react-i18next";

interface LevelInfoRowProps {
  level: ApiComponents["schemas"]["MonthlyLevel"];
  levelSize?: "medium" | "large";
  hold?: number;
  reach?: number;
  alternativeText?: string;
}

const StyledLevelInfoRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(p) => p.theme.colors.gray300};

  .experience-row {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5em;

    div {
      &:not(:last-child) {
        margin-left: 1.75em;
      }
    }
  }
  .alternative-text {
    margin: 0.5em 0 0.5em 1.75em;
    &.large {
      margin: 0.5em 0 0.5em 2.25em;
    }
  }
`;

export const LevelInfoRow = ({
  level,
  levelSize,
  hold = 0,
  reach = 0,
  alternativeText,
}: LevelInfoRowProps) => {
  const { t } = useTranslation();

  return (
    <StyledLevelInfoRow className="aq-mt-2">
      <Level level={level} size={levelSize} />
      {!alternativeText ? (
        <div className="experience-row">
          <Experience
            icon={doubleArrow}
            alt={t("__RANKING_LEGEND_HOLD_MAX: 15", {
              defaultValue: "Maintenance",
            })}
            value={`${hold} exp`}
            small
          />
          <Experience
            icon={arrow}
            alt={t("__RANKING_LEGEND_NEXT_MAX: 15", {
              defaultValue: "Advancement",
            })}
            value={`${reach} exp`}
            small
          />
        </div>
      ) : (
        <Text className={`alternative-text ${levelSize}`}>
          {alternativeText}
        </Text>
      )}
    </StyledLevelInfoRow>
  );
};
