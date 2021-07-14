import styled from "styled-components";
import { StyledRectProps } from "./_types";

export const StyledRect = styled.div(
  ({ rx }: StyledRectProps) => `
    position: absolute;
    top: -110px;
    svg {
      width: 530px;
      height: 740px;
      overflow: visible;
      rect {
        width: 530px;
        height: 530px;
        rx: ${rx};
      }
    }
  `
);
