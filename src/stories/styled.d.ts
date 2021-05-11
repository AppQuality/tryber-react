// import original module declarations
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: {
      fontFamily: {
        base: string
        serif: string
      }
      fontSize: {
        base: string
        small: string
      }
      fontWeight: {
        light: number,
        bold: number
      }
    }
    palette: {
      primary: string
      secondary: string
      disabledFont: string
      disabledElement: string
    }
    grid: {
      breakpoints: {
        sm: string
        xs: string
        md: string
        lg: string
        xl: string
        xxl: string
      }
    }
  }
}
