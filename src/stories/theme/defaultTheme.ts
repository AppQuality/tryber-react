import { DefaultTheme } from "styled-components";

export interface Colors {
  blue: string
  blue700: string
  cyan600: string
  grey100: string
  grey300: string
  grey600: string
}

export const COLORS: Colors = {
  blue: "#266A9A",
  blue700: '#17405C',
  cyan600: '#448098',
  grey100: '#F0F5F7',
  grey300: '#D1E0E8',
  grey600: '#8EA2AE',
}

const aqBootstrapTheme: DefaultTheme = {
  typography: {
    fontFamily: {
      base:
        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;',
      serif: "IBM Plex Serif",
    },
    fontSize: {
      base: ".875rem",
      small: ".75rem",
    },
    fontWeight: {
      light: 300,
      bold: 700,
    },
  },
  colors: COLORS,
  palette: {
    primary: COLORS.blue700,
    secondary: COLORS.cyan600,
    info: COLOR.blue,
    disabledFont: COLORS.grey600,
    disabledElement: COLORS.grey300,
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
