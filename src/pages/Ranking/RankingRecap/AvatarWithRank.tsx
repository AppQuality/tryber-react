import styled from "styled-components";
import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import React, { useEffect } from "react";
import getGravatarUrlWithThemedFallbackInitials from "src/utils/getGravatarUrlWithThemedFallbackInitials";

interface AvatarWithRankProps {
  user: any;
  rankingSummary: any;
}
const StyledAvatar = styled.div<{ badgeColor: string }>`
  position: relative;
  width: 132px;
  .ranking-avatar {
    width: 105px;
    height: 105px;
    border-radius: 50%;
  }
  .badge {
    position: absolute;
    bottom: -5px;
    right: 0;
    color: ${(p) => p.badgeColor};
    font-size: 0.8rem;
    width: 60px;
    height: 60px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export const AvatarWithRank = ({
  user,
  rankingSummary,
}: AvatarWithRankProps) => {
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
      <span className="badge">{rankingTheme[id].icon}</span>
    </StyledAvatar>
  );
};
