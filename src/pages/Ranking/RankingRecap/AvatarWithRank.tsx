import styled from "styled-components";
import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import React, { useEffect } from "react";
import getGravatarUrlWithThemedFallbackInitials from "src/utils/getGravatarUrlWithThemedFallbackInitials";

const badgeSize = "60px";
const avatarSize = "105px";

const StyledAvatar = styled.div<{ badgeColor: string }>`
  position: relative;
  .ranking-avatar {
    display: inline-block;
    width: ${avatarSize};
    height: ${avatarSize};
    border-radius: 50%;
  }
  .badge {
    display: inline-block;
    margin-left: calc(${badgeSize} / -2);
    color: ${(p) => p.badgeColor};
    font-size: 0.8rem;
    width: ${badgeSize};
    height: ${badgeSize};
    transform: translateY(8px);
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export const AvatarWithRank = ({ user, rankingSummary }: UserRankProps) => {
  const { id } = rankingSummary.level;
  const badgeColor = rankingTheme[id].main;
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");
  useEffect(() => {
    setAvatarUrl(
      getGravatarUrlWithThemedFallbackInitials(user.image, badgeColor)
    );
  }, [user.image, badgeColor]);
  return (
    <StyledAvatar badgeColor={badgeColor}>
      <img className="ranking-avatar" src={avatarUrl} alt={user?.name} />
      <div className="badge">{rankingTheme[id].icon}</div>
    </StyledAvatar>
  );
};
