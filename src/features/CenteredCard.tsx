import { Card } from "@appquality/appquality-design-system";
import styled from "styled-components";

export const CenteredCard = styled(Card)`
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.md}) {
    max-width: 650px;
    margin: 0 auto;
    .card-body {
      max-width: 300px;
      margin: 0 auto;
    }
  }
`;
