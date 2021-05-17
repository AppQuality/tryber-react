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
        bold: number;
      };
    };
    colors: Colors;
    palette: {
      primary: string;
      secondary: string;
      info: string;
      disabledFont: string;
      disabledElement: string;
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
    };
  }
}
