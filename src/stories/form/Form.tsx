import React, {ChangeEventHandler, ReactNode} from "react";
import "./form.scss";

export interface FormProps {
  /**
   * Forms contents
   */
  children?: ReactNode
}

/**
 * Primary UI component for user interaction
 */
export const Form = ({children}: FormProps) => {
  return (
    <form>{children}</form>
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
