import styled from "styled-components";
import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import React from "react";

interface AvatarWithRankProps {
  user: any;
  rankingSummary: any;
}
const StyledAvatar = styled.div<{ badgeColor: string }>`
  position: relative;
  .ranking-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .badge {
    position: absolute;
    bottom: -10px;
    right: -10px;
    color: ${(p) => p.badgeColor};
    font-size: 0.8rem;
  }
`;

export const AvatarWithRank = ({
  user,
  rankingSummary,
}: AvatarWithRankProps) => {
  const { id } = rankingSummary.level;
  const badgeColor = rankingTheme[id].textColor;

  return (
    <StyledAvatar badgeColor={badgeColor}>
      <img className="ranking-avatar" src={user?.image} alt={user?.name} />
      <span className="badge">{rankingTheme[id].icon}</span>
    </StyledAvatar>
  );
};
