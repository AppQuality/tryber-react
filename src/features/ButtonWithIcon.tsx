import { Button } from "@appquality/appquality-design-system";
import styled from "styled-components";

export const ButtonWithIcon = styled(Button)`
  border: 1px solid ${({ theme }) => theme.palette.primary};
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.md}) {
    margin: 0 auto;
  }
  .button-left-img {
    height: 24px;
    width: 24px;
  }
  display: flex;
  align-items: center;
  .button-text {
    text-align: center;
    flex-grow: 1;
  }
`;
