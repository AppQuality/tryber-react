import React from 'react'
import {Checkbox, Field} from "../stories/form/Form"
import I18n from "../I18n"
import {Button} from "../stories/button/Button"
import {Formik, Form} from "formik"
import * as yup from 'yup'
import {PageInterface} from "../pages/GettingStarted";

export const SignupForm = ({location}:PageInterface) => {
  const validationSchema = {
    name: '',
    surname: '',
    email: '',
    password: '',
    subscribe: ''
  };
  const initialValues = {
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8, 'password must be at least 8 character').required(),
    subscribe: yup.boolean()
  }
  return (
    <Formik
      onSubmit={values => {
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      <Form>
        <Field type="text" name='name' label={I18n.getTranslation(location,"name")} />
        <Field type="text" name='surname' label={I18n.getTranslation(location,"surname")} />
        <Field type="email" name='email' label={I18n.getTranslation(location,"email")} />
        <Field type="password" name='password' label={I18n.getTranslation(location,"password")} />
        <p><I18n t="password-requirements" /></p>
        <Checkbox name='subscribe' label={I18n.getTranslation(location,"accept-to-receive-email")} />
        <Button htmlType='submit'>
          {I18n.getTranslation(location,"signup-now")}
        </Button>
        <p><I18n t="clicking-button-you-accept-tos" /></p>
      </Form>
    </Formik>
  )
}
