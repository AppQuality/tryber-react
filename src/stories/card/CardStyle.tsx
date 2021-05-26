import styled, { DefaultTheme } from "styled-components";
import { CardProps } from "./CardProps";

export const CardStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: ${(props) => props.theme.colors.white};
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5px;

  .aq-card-body {
    flex: 1 1 auto;
    padding: 1rem 1rem;
  }
`;
