import React, {MouseEventHandler, ReactNode} from "react";
import "./button.scss";

export interface ButtonProps {
  htmlType?: 'button' | 'submit' | 'reset'
  /**
   * Is this the principal call to action on the page?
   */
  type?: "primary" | "secondary" | "link" | "light"
  /**
   * How large should the button be?
   */
  size?: "sm" | "medium" |"lg" | "block"
  /**
   * Forms contents
   */
  children?: ReactNode
  /**
   * Is flat?
   */
  flat?: boolean
  /**
   * Optional is disabled?
   */
  disabled?: boolean
  /**
   * Optional is for icon?
   */
  icon?: boolean
  /**
   * Optional click handler
   */
  onClick?: MouseEventHandler
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({htmlType = 'button', type = 'primary', size = 'medium', flat=false, icon=false, children, ...props }: ButtonProps) => {
  let className = ["btn", `btn-${size}`, `btn-${type}`]
  if (flat) {
    className.push('btn-flat')
  }
  if (icon) {
    className.push('btn-flat')
  }
  return (
    <button
      type={htmlType}
      className={className.join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};
