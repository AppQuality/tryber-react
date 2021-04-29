import React from 'react'
import {Checkbox, Field} from "../stories/form/Form"
import {Button} from "../stories/button/Button"
import {Formik, Form} from "formik"
import * as yup from 'yup'
import {PageInterface} from "../pages/GettingStarted";

import { useTranslation } from 'react-i18next';

export const SignupForm = ({location}:PageInterface) => {
  const { t } = useTranslation();
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
        <Field type="text" name='name' label={t("name")} />
        <Field type="text" name='surname' label={t("surname")} />
        <Field type="email" name='email' label={t("email")} />
        <Field type="password" name='password' label={t("password")} />
        <p>{t("password-requirements")}</p>
        <Checkbox name='subscribe' label={t("accept-to-receive-email")} />
        <Button htmlType='submit'>
          {t("signup-now")}
        </Button>
        <p>{t("clicking-button-you-accept-tos")}</p>
      </Form>
    </Formik>
  )
}
