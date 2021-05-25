import { ButtonProps } from "./ButtonProps";
import { ButtonStyle } from "./ButtonStyle";

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  htmlType = "button",
  type = "primary",
  size = "medium",
  flat = false,
  squared = false,
  children,
  ...props
}: ButtonProps) => {
  let className = [`aq-btn-${size}`, `aq-btn-${type}`];
  if (flat) {
    className.push("aq-btn-flat");
  }
  if (squared) {
    className.push("aq-btn-squared");
  }
  return (
    <ButtonStyle type={htmlType} className={className.join(" ")} {...props}>
      {children}
    </ButtonStyle>
  );
};
