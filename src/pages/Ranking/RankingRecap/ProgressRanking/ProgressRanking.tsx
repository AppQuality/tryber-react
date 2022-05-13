import styled from "styled-components";
import { LevelStep } from "./LevelStep";
import backgroundH from "src/pages/Ranking/RankingRecap/ProgressRanking/assets/backgroundH.svg";
import backgroundHColored from "src/pages/Ranking/RankingRecap/ProgressRanking/assets/backgroundHColored.svg";
import backgroundV from "src/pages/Ranking/RankingRecap/ProgressRanking/assets/backgroundV.svg";
import backgroundVColored from "src/pages/Ranking/RankingRecap/ProgressRanking/assets/backgroundVColored.svg";

const StyledProgressRanking = styled.div<{ colored?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: url(${(p) => (p.colored ? backgroundHColored : backgroundH)})
    no-repeat;
  background-size: 97%;

  .level-step {
    &:not(.no-after) {
      .level-step-icon {
        position: relative;
        &:after {
          content: "";
          display: block;
          position: absolute;
          height: 4px;
          background: ${(p) => p.theme.colors.gray100};
          width: 75px;
          top: 42%;
          left: 19px;
        }
      }
    }
  }

  @media (max-width: ${(p) => p.theme.grid.breakpoints.xl}) {
    .level-step {
      &:not(.no-after) {
        .level-step-icon {
          &:after {
            width: 60px;
          }
        }
      }
    }
  }

  @media (max-width: ${(p) => p.theme.grid.breakpoints.lg}) {
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
      &:not(.no-after) {
        .level-step-icon {
          &:after {
            width: 4px;
            height: 30px;
            top: 24px;
            left: 10px;
          }
        }
      }
    }
  }
`;

interface ProgressRankingProps {
  levelsList?: ApiComponents["schemas"]["MonthlyLevel"];
  prospectLevelId?: number;
  isComplete?: boolean;
}

const levelList = [
  {
    id: 10,
    name: "Basic",
  },
  {
    id: 20,
    name: "Bronze",
  },
  {
    id: 30,
    name: "Silver",
  },
  {
    id: 40,
    name: "Gold",
  },
  {
    id: 50,
    name: "Platinum",
  },
  {
    id: 60,
    name: "Diamond",
  },
  {
    id: 100,
    name: "Legendary",
  },
];

export const ProgressRanking = ({
  levelsList,
  prospectLevelId = 0,
  isComplete,
}: ProgressRankingProps) => {
  return (
    <StyledProgressRanking colored={isComplete}>
      {levelList?.map((level, i) => (
        <LevelStep
          key={level.id}
          className={`level-step ${
            i === levelList.length - 1 || i === levelList.length - 2
              ? "no-after"
              : ""
          }`}
          level={level}
          isOn={level.id <= prospectLevelId}
          isLarge={i === levelList.length - 1}
        />
      ))}
    </StyledProgressRanking>
  );
};
