import { shallowEqual, useSelector } from "react-redux";
import { SkeletonHeader } from "src/pages/Profile/SkeletonHeader";
import { AvatarWithRank } from "src/pages/Ranking/RankingRecap/AvatarWithRank";
import { CurrentSituation } from "./CurrentSituation";
import { NextMonthSituation } from "./NextMonthSituation";
import styled from "styled-components";

const HeaderRecap = styled.div`
  .left-recap {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: ${(p) => p.theme.grid.sizes[1]};
  }
  @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
    display: grid;
    grid-template-columns: 40% 60%;
  }
`;

export const RankingRecap = () => {
  const { user, loading } = useSelector(
    (state: GeneralState) => ({
      user: state.user.user,
      loading: state.user.loading,
    }),
    shallowEqual
  );
  const { summary, levelInfo } = useSelector(
    (state: GeneralState) => state.ranking,
    shallowEqual
  );

  if (loading || !summary) return <SkeletonHeader />;
  return (
    <HeaderRecap>
      <div className="left-recap">
        <AvatarWithRank user={user} rankingSummary={summary} />
        <CurrentSituation user={user} rankingSummary={summary} />
      </div>
      <NextMonthSituation
        user={user}
        rankingSummary={summary}
        levelsList={levelInfo}
      />
    </HeaderRecap>
  );
};
