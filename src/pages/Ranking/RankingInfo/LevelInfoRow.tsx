import styled from "styled-components";
import { Text } from "@appquality/appquality-design-system";
import { Level } from "../Level";
import { Experience } from "./Experience";
import arrow from "./assets/arrow.svg";
import doubleArrow from "./assets/doubleArrow.svg";

interface LevelInfoRowProps {
  level: ApiComponents["schemas"]["MonthlyLevel"];
  levelSize?: "medium" | "large";
  min?: number;
  max?: number;
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
  min = 0,
  max = 0,
  alternativeText,
}: LevelInfoRowProps) => {
  return (
    <StyledLevelInfoRow className="aq-mt-2">
      <Level level={level} size={levelSize} />
      {!alternativeText ? (
        <div className="experience-row">
          <Experience
            icon={doubleArrow}
            alt={"Mantenimento"}
            value={`${min} exp`}
            small
          />
          <Experience
            icon={arrow}
            alt={"Avanzamento"}
            value={`${max} exp`}
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
