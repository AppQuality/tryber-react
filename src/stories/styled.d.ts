// import original module declarations
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    typography: {
      fontFamily: {
        base: string
      }
      fontSize: {
        base: string
        small: string
      }
      fontWeight: {
        light: number
      }
    }
    palette: {
      primary: string
      secondary: string
    }
  }
}