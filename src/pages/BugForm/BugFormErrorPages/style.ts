import styled from "styled-components";

export const StyledBugFormError = styled.div`
  text-align: center;
  position: relative;
  margin: 4em 0;

  .empathy-container {
    position: absolute;
    top: 15px;
    left: 0;
    right: 10px;
    margin: auto;
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .img-45 {
      width: 45%;
    }

    .img-30 {
      width: 30%;
    }
  }

  @media (min-width: ${(p) => p.theme.grid.breakpoints.md}) {
    .empathy-container {
      top: 110px;
      width: 26em;
      .img-30,
      .img-45 {
        width: auto;
      }
    }
  }
`;
