import styled from "styled-components";
import { LevelStep } from "./LevelStep";
import backgroundH from "src/pages/Ranking/RankingRecap/ProgressRanking/assets/backgroundH.svg";
import backgroundHColored from "src/pages/Ranking/RankingRecap/ProgressRanking/assets/backgroundHColored.svg";
import backgroundV from "src/pages/Ranking/RankingRecap/ProgressRanking/assets/backgroundV.svg";
import backgroundVColored from "src/pages/Ranking/RankingRecap/ProgressRanking/assets/backgroundVColored.svg";

const StyledProgressRanking = styled.div<{
  stepMargin: string;
  colored?: boolean;
}>`
  display: flex;
  width: max-content;
  height: 22em;
  flex-direction: column;
  align-items: baseline;
  background: url(${(p) => (p.colored ? backgroundVColored : backgroundV)})
    no-repeat;
  margin: 0 auto;
  padding-top: 1em;
  background-size: auto 100%;
  background-position: left;

  .level-step {
    &:not(:last-child) {
      margin-right: ${(p) => p.stepMargin};
    }
    &:last-child {
      margin-left: 0.45em;
    }
    &:not(.no-after) {
      position: relative;
      &:after {
        content: "";
        display: block;
        position: absolute;
        width: 5px;
        height: 100%;
        top: 50%;
        left: 11px;
        background: ${(p) => p.theme.colors.gray100};
      }
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: auto;
    background: url(${(p) => (p.colored ? backgroundHColored : backgroundH)})
      no-repeat;
    background-size: 97%;
    margin: 0;
    padding-top: 0;

    .level-step {
      &:last-child {
        margin-left: 0;
      }
      &:not(.no-after) {
        &:after {
          height: 5px;
          width: calc(100% + ${(p) => p.stepMargin});
          top: 12px;
          left: 50%;
        }
      }
    }
  }
`;

interface ProgressRankingProps {
  levelsList?: ApiComponents["schemas"]["MonthlyLevel"][];
  prospectLevelId?: number;
  isComplete?: boolean;
}

export const ProgressRanking = ({
  levelsList,
  prospectLevelId = 0,
  isComplete,
}: ProgressRankingProps) => {
  return (
    <StyledProgressRanking stepMargin={"0.5em"} colored={isComplete}>
      {levelsList?.map((level, i) => {
        const isLast = i === levelsList.length - 1;
        return (
          <LevelStep
            key={level.id}
            className={`level-step ${
              isLast || i === levelsList.length - 2 ? "no-after" : ""
            }`}
            level={level}
            isOn={level.id <= prospectLevelId}
            isBig={isLast}
          />
        );
      })}
    </StyledProgressRanking>
  );
};
