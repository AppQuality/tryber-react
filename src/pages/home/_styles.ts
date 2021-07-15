import styled from "styled-components";
import { StyledRectProps } from "./_types";

export const StyledSection = styled.section`
  position: relative;
  margin-top: 100px;
  .section-content-wrapper,
  .section-title-wrapper {
    position: relative;
    z-index: 1;
  }
`;
export const StyledCta = styled.div`
  button, a {
    @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) { {
      max-width: 200px;
      margin: 0 auto;
    }
  }
`;
