import { DefaultTheme } from "styled-components";
import COLORS from "../styles/colors.module.scss";

const aqBootstrapTheme: DefaultTheme = {
  typography: {
    fontFamily: {
      base:
        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
      serif: "IBM Plex Serif",
    },
    fontSize: {
      base: ".875rem",
      small: ".75rem",
    },
    fontWeight: {
      light: 300,
      normal: 500,
      bold: 700,
    },
  },
  colors: COLORS,
  palette: {
    primary: COLORS.blue700,
    secondary: COLORS.cyan600,
    info: COLORS.blue500,
  },
  grid: {
    breakpoints: {
      xs: "0",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
  },
};

export { aqBootstrapTheme };
