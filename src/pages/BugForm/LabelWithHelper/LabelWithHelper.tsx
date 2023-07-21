import styled from "styled-components";
import { ReactComponent as QuestionMark } from "./assets/question.svg";

const StyledLabelWithHelper = styled.div<{ small?: boolean }>`
  display: flex;
  justify-content: space-between;
  a {
    max-height: ${(p) => (p.small ? "21px" : "28px")};
  }
  .question-mark {
    cursor: pointer;
    width: ${(p) => (p.small ? "21px" : "28px")};
    height: ${(p) => (p.small ? "21px" : "28px")};
  }
`;

interface LabelWithHelperProps {
  label: string;
  href?: string;
  small?: boolean;
  title?: string;
  onClick?: () => void;
  hideHelper?: boolean;
}

export const LabelWithHelper = ({
  label,
  small,
  href,
  title,
  onClick,
  hideHelper,
}: LabelWithHelperProps) => {
  return (
    <StyledLabelWithHelper small={small}>
      <div>{label}</div>
      {!hideHelper && (
        <a href={href} target="_blank" rel="noreferrer">
          <QuestionMark
            className="question-mark"
            title={title}
            onClick={onClick}
          />
        </a>
      )}
    </StyledLabelWithHelper>
  );
};
