import styled, {DefaultTheme} from "styled-components"

export interface TypographyProps {
  theme: DefaultTheme,
  color?: keyof DefaultTheme['palette']
}

export interface ParagraphProps extends TypographyProps {
  small?: boolean
}
/**
 * Primary UI component for paragraphs
 */
export const Paragraph = styled.p(({theme, small}: ParagraphProps) => {
  const {palette, typography} = theme;
  return `
  color: ${palette.primary};
  font-family: ${typography.fontFamily.base};
  font-size: ${(small) ? typography.fontSize.small : typography.fontSize.base};
  font-weight: ${typography.fontWeight.light};
  line-height: 1.5;
`
});
