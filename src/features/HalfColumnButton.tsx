import styled from "styled-components";
import { Button } from "@appquality/appquality-design-system";

export const HalfColumnButton = styled(Button)`
  grid-column: span 2;
  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-column: span 1;
  }
`;
