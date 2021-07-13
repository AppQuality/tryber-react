import styled from "styled-components";
import { StyledRectProps } from "./_types";

export const StyledRect = styled.div(
  ({ rx }: StyledRectProps) => `
    svg rect {
      rx: ${rx};
    }
  `
);
