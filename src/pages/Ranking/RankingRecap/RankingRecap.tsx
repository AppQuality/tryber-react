import { shallowEqual, useSelector } from "react-redux";
import { SkeletonHeader } from "src/pages/Profile/SkeletonHeader";
import { AvatarWithRank } from "src/pages/Ranking/RankingRecap/AvatarWithRank";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import styled from "styled-components";
import { CurrentSituation } from "./CurrentSituation";
import { NextMonthSituation } from "./NextMonthSituation";

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
  const { data: user, isLoading: loading } = useGetUsersMeQuery({
    fields: "name,surname,id,total_exp_pts,image",
  });
  const { summary, levelInfo } = useSelector(
    (state: GeneralState) => state.ranking,
    shallowEqual
  );

  if (loading || !summary || !user) return <SkeletonHeader />;
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
