import styled, { DefaultTheme } from "styled-components";
import { ButtonProps } from "./ButtonProps";

interface ButtonStyleProps {
  theme: DefaultTheme;
  type: ButtonProps["htmlType"];
}
export const ButtonStyle = styled.button(({ theme }: ButtonStyleProps) => {
  const styles = Object.entries(theme.palette)
    .map(
      ([key, value]) => `
		 &.aq-btn-${key} {
			 border: 1px solid ${value};
			 background-color: ${value};
			 color: ${theme.colors.white};
       &:hover {
        filter: saturate(0.7);
       }
			 &.aq-btn-flat {
				 background-color: ${theme.colors.white};
				 color: ${value};
         
         &:hover {
          filter: none;
     			border: 1px solid ${value};
     			background-color: ${value};
     			color: ${theme.colors.white};
         }
			 }
		 }
 	 `
    )
    .join(" ");

  const sizes = {
    sm: {
      padding: ".375rem .5rem",
      fontSize: theme.typography.fontSize.small,
      borderRadius: ".2rem",
    },
    lg: {
      padding: ".813rem 1rem",
      fontSize: theme.typography.fontSize.base,
      borderRadius: ".3rem",
    },
  };

  const sizesStyle = Object.entries(sizes)
    .map(
      ([key, data]) => `
    &.aq-btn-${key} {
      padding: ${data.padding};
      font-size: ${data.fontSize};
      border-radius: ${data.borderRadius};
    }
  `
    )
    .join(" ");

  return `
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 15%), 0 1px 1px rgb(0 0 0 / 8%);
    padding: .5rem .75rem;
    font-size: ${theme.typography.fontSize.base};
    border-radius: 5px;
		
    display: inline-block;
    font-family:${theme.typography.fontFamily.base};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: 1.5;
    transition: filter 0.15s ease-in-out 0s, background-color  0.15s ease-in-out 0s;
    color: ${theme.palette.primary};
    
		${styles}
    
    &.aq-btn-link {
      box-shadow: none;
      border: 0px;
      background-color: transparent;
      color: ${theme.palette.primary};
    }
    &.aq-btn-light {
      border: 0px;
      background-color: ${theme.colors.white};
    }
    
    ${sizesStyle}
    &.aq-btn-block {
      width:100%;
    }
    
    &:disabled, &.disabled {
      pointer-events: none;
      opacity: .65;
      color: ${theme.colors.disabledDark};
      background-color: ${theme.colors.disabled};
      border-color: ${theme.colors.disabled};
      
      &.aq-btn-flat {
        background-color: transparent;
        border-color: ${theme.colors.disabledDark};
        color: ${theme.colors.disabledDark};
      }
    }
	`;
});
