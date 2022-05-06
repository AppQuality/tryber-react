import styled from "styled-components";

export const StyledRanking = styled.div`
  .table-card {
    grid-template-columns: 6px 2em max-content 60% auto;
  }
  .tbody.cell {
    display: flex;
    align-items: center;
    padding: 8px 8px;
  }
  @media (min-width: ${(p) => p.theme.grid.breakpoints.sm}) and (max-width: ${(
      p
    ) => p.theme.grid.breakpoints.md}) {
    .table-card {
      grid-template-columns: 6px 2em max-content 45% auto;
    }
  }
  @media (max-width: ${(p) => p.theme.grid.breakpoints.sm}) {
    .table-card {
      grid-template-columns: 6px 1.5em max-content minmax(5%, 40%) minmax(
          20%,
          35%
        );
      grid-column-gap: 8px;
    }
  }
`;

export const StyledAvatar = styled.div`
  display: flex;
  img {
    width: 33px;
    height: 33px;
    border-radius: 50%;
  }
`;

export const StyledExp = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  img {
    margin-right: 1.5em;
  }
  @media (max-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    img {
      margin-right: 1em;
    }
  }
  @media (max-width: ${(p) => p.theme.grid.breakpoints.sm}) {
    img {
      margin-right: 0.5em;
    }
  }
`;
