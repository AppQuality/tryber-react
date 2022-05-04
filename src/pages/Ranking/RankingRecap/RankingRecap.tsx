import { shallowEqual, useSelector } from "react-redux";
import { SkeletonHeader } from "src/pages/Profile/SkeletonHeader";
import { AvatarWithRank } from "src/pages/Ranking/RankingRecap/AvatarWithRank";
import { CurrentSituation } from "./CurrentSituation";
import styled from "styled-components";

const LeftRecap = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

export const RankingRecap = () => {
  const { user, loading } = useSelector(
    (state: GeneralState) => ({
      user: state.user.user,
      loading: state.user.loading,
    }),
    shallowEqual
  );
  const { summary } = useSelector(
    (state: GeneralState) => state.ranking,
    shallowEqual
  );

  if (loading || !summary) return <SkeletonHeader />;
  return (
    <>
      <LeftRecap>
        <AvatarWithRank user={user} rankingSummary={summary} />
        <CurrentSituation user={user} rankingSummary={summary} />
      </LeftRecap>
    </>
  );
};
