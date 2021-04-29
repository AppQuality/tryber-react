import React, {ChangeEventHandler} from "react";
import {Field as FormikField, FieldProps} from "formik";
import "./form.scss";

interface GenericFieldInterface {
  name: string
  label?: string
  onChange?: ChangeEventHandler
}

export interface FieldInterface extends GenericFieldInterface {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel'
  placeholder?: string
}

export const Field = ({type = 'text', placeholder, name, onChange, label, ...props}: FieldInterface) => {
  return (
    <FormikField name={name}>
      {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: FieldProps) => {
        return (
          <div className="form-group">
            {(label) && <label className="form-label">{label}</label>}
            <input type={type} placeholder={placeholder} onChange={field.onChange} onBlur={field.onBlur} className="form-control" value={field.value} />
            {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
          </div>
        )
      }}
    </FormikField>
  )
};

export const Checkbox = ({name, onChange, label, ...props}: GenericFieldInterface) => {
  return (
    <FormikField name={name}>
      {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }: FieldProps) => (
        <div className="form-check">
          {(label) && <label className="form-check-label">{label}</label>}
          <input type='checkbox' onChange={onChange} {...props} className="form-check-input"/>
          {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
        </div>
      )}
    </FormikField>
  )
}
