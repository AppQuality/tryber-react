import styled from "styled-components";
import { StyledRectProps } from "./_types";

export const StyledRect = styled.div(
  ({ rx }: StyledRectProps) => `
    position: absolute;
    top: -150px;
    svg {
      width: 500px;
      height: 1000px;
      overflow: visible;
      rect {
        width: 540px;
        height: 540px;
        rx: ${rx};
      }
    }
  `
);
