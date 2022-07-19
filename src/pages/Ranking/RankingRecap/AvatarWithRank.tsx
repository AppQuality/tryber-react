import styled from "styled-components";
import { rankingTheme } from "src/pages/Ranking/rankingTheme";
import React, { useEffect } from "react";
import getGravatarUrlWithThemedFallbackInitials from "src/utils/getGravatarUrlWithThemedFallbackInitials";

const badgeWidth = "54px";
const badgeHeight = "54px";
const avatarSize = "105px";
const badgeWidthDesk = "36px";
const badgeHeightDesk = "36px";
const avatarSizeDesk = "62px";

const StyledAvatar = styled.div<{ badgeColor: string }>`
  position: relative;
  .ranking-avatar {
    display: inline-block;
    width: ${avatarSize};
    height: ${avatarSize};
    border-radius: 50%;
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      width: ${avatarSizeDesk};
      height: ${avatarSizeDesk};
    }
  }
  .badge {
    display: inline-block;
    margin-left: calc(${badgeWidth} / -2);
    color: ${(p) => p.badgeColor};
    font-size: 0.8rem;
    width: ${badgeWidth};
    height: ${badgeHeight};
    transform: translateY(5px);
    svg {
      width: 100%;
      height: 100%;
    }
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      margin-left: calc(${badgeWidthDesk} / -2);
      width: ${badgeWidthDesk};
      height: ${badgeHeightDesk};
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
