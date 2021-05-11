import {DefaultTheme} from 'styled-components'

const COLORS = {
  blue700: '#17405C',
  cyan600: '#448098',
  grey300: '#D1E0E8',
  grey600: '#8EA2AE',
}

const aqBootstrapTheme:DefaultTheme = {
  typography: {
    fontFamily: {
      base: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;',
      serif: 'IBM Plex Serif'
    },
    fontSize: {
      base: '.875rem',
      small: '.75rem'
    },
    fontWeight: {
      light: 300,
      bold: 700
    },
  },
  palette: {
    primary: COLORS.blue700,
    secondary: COLORS.cyan600,
    disabledFont: COLORS.grey600,
    disabledElement: COLORS.grey300
  },
  grid: {
    breakpoints: {
      xs: '0',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px'
    }
  }
}

export {aqBootstrapTheme}
