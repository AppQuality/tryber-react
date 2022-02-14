import { Text } from "@appquality/appquality-design-system";
import styled from "styled-components";

export default styled(Text)`
  font-size: 22px;
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.md}) {
    font-size: 24px;
  }
  @media only screen and (min-width: ${(props) =>
      props.theme.grid.breakpoints.lg}) {
    font-size: 26px;
  }
`;
