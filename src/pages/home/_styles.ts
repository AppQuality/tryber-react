import styled from "styled-components";

export const StyledCta = styled.div`
  button, a {
    @media (min-width: ${(props) => props.theme.grid.breakpoints.md}) { {
      max-width: 200px;
      margin: 0 auto;
    }
    &:first-letter {
      text-transform: capitalize;
    }
  }
`;
