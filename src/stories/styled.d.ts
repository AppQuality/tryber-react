// import original module declarations
import "styled-components";
import { Colors } from "./theme/defaultTheme";

declare module "styled-components" {
  export interface DefaultTheme {
    typography: {
      fontFamily: {
        base: string;
        serif: string;
      };
      fontSize: {
        base: string;
        small: string;
      };
      fontWeight: {
        light: number;
        normal: number;
        bold: number;
      };
    };
    colors: Colors;
    palette: {
      primary: string;
      secondary: string;
      info: string;
      success: string;
      warning: string;
      danger: string;
    };
    grid: {
      breakpoints: {
        sm: string;
        xs: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      spacing: {
        default: string;
      };
      sizes: {
        1: string;
        2: string;
        3: string;
        4: string;
      };
    };
  }
}
