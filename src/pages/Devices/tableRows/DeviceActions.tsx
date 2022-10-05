import styled from "styled-components";
import { Button } from "@appquality/appquality-design-system";

const DeviceActions = styled.div`
  display: flex;
  flex-flow: column;
  .action-text { display: none;}
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      display: block;
      .action-text { display: block; }
      .action-icon { display: none; }
    }
  }
  ${Button} {
    display: block;
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      display: inline-block;
    }
  }
`;
export default DeviceActions;
