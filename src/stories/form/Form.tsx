import React, {ChangeEventHandler, MouseEventHandler, ReactNode} from "react";
import "./form.scss";

export interface ButtonProps {
  htmlType?: 'button' | 'submit' | 'reset'
  /**
   * Is this the principal call to action on the page?
   */
  type?: "primary" | "secondary" | "link"
  /**
   * How large should the button be?
   */
  size?: "sm" | "medium" | "lg"
  /**
   * Forms contents
   */
  children?: ReactNode
  /**
   * Optional click handler
   */
  onClick?: MouseEventHandler
}

/**
 * Primary UI component for user interaction
 */
export const Form = () => {
  return (
    <form></form>
  )
};

export interface FieldInterface{
  name: string
  type?: string
  placeholder?: string
  onChange?: ChangeEventHandler
}
export const Field = ({type = 'text', placeholder, name, onChange, ...props}: FieldInterface) => {
  return (
    <div className="mb-3 form-group">
      <label className="form-label">{name}</label>
      <input type={type} placeholder={placeholder} onChange={onChange} {...props} className="form-control"/>
      <div className="error">error</div>
    </div>
  )
};
