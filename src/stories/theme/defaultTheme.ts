import { DefaultTheme } from "styled-components";

const aqBootstrapTheme: DefaultTheme = {
  typography: {
    fontFamily: {
      base:
        'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;',
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
  palette: {
    primary: "#17405C",
    secondary: "#448098",
    info: "#266A9A",
    disabledFont: "#8EA2AE",
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
