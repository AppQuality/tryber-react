import styled from "styled-components";

interface StyledTopTitleProps {
  readonly background?: string;
  readonly color?: string;
  readonly bold?: boolean;
}

const StyledTopTitle = styled.div<StyledTopTitleProps>`
  border-bottom: 1px solid ${(p) => p.theme.colors.gray300};
  min-height: 3em;
  width: 100%;
  padding: 0.75em 1em;
  background: ${(p) => p.background};
  color: ${(p) => p.color || p.theme.palette.primary};
  ${(p) =>
    p.bold &&
    `
        font-weight: ${p.theme.typography.fontWeight.bold};
        `};
`;

interface TopTitleProps {
  text: string;
  background?: string;
  color?: string;
  bold?: boolean;
}

export const TopTitle = ({ text, background, color, bold }: TopTitleProps) => {
  return (
    <StyledTopTitle background={background} color={color} bold={bold}>
      {text}
    </StyledTopTitle>
  );
};
