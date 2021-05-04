import styled, {DefaultTheme} from "styled-components"

export interface TypographyProps {
  theme: DefaultTheme,
  color?: keyof DefaultTheme['palette']
}

export interface ParagraphProps extends TypographyProps {
  small?: boolean
}
export interface H5Props extends TypographyProps {}
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

/**
 * Primary UI component for h5
 */
export const H5 = styled.h5(({theme}: H5Props) => {
  const {palette, typography} = theme;
  return `
  color: ${palette.primary};
  font-family: ${typography.fontFamily.base};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.bold};
  line-height: 1.5;
`
});
