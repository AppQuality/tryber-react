import styled, { DefaultTheme } from "styled-components";
import { ButtonProps } from "./ButtonProps";

interface ButtonStyleProps {
  theme: DefaultTheme;
  type: ButtonProps["htmlType"];
}
export const ButtonStyle = styled.button(({ theme }: ButtonStyleProps) => {
  let base = `
	    box-shadow: inset 0 1px 0 rgb(255 255 255 / 15%), 0 1px 1px rgb(0 0 0 / 8%);
	    padding: .5rem .75rem;
	    font-size: ${theme.typography.fontSize.base};
	    border-radius: 5px;
			
	    display: inline-block;
	    font-family:${theme.typography.fontFamily.base};
	    font-weight: ${theme.typography.fontWeight.normal};
	    line-height: 1.5;
	`;
  let styles = Object.entries(theme.palette).map(
    ([key, value]) => `
		 &.aq-btn-${key} {
			 border: 1px solid ${value};
			 background-color: ${value};
			 color: ${theme.colors.white};
			 &.aq-btn-flat {
				 background-color: ${theme.colors.white};
				 color: ${value};
			 }
		 }
 	 `
  );
  return `
		${base}
		${styles}
	`;
});
