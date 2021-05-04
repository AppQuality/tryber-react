import React from 'react'
import {Checkbox, Field} from "../stories/form/Form"
import {Button} from "../stories/button/Button"
import {Formik, Form, FormikProps} from "formik"
import * as yup from 'yup'
import { useTranslation } from 'react-i18next';
import API from '../utils/api'
import {Paragraph} from "../stories/typography/Typography";

interface SignupFormProps {
  redirectUrl: string
}

export const SignupForm = ({redirectUrl}: SignupFormProps) => {
  const { t, i18n } = useTranslation();
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    subscribe: ''
  };
  const validationSchema = {
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8, 'password must be at least 8 character').required(),
    subscribe: yup.boolean().oneOf([true], 'Must Accept Terms and Conditions').required()
  }
  return (
    <Formik
      onSubmit={async (values, actions) => {
        try {
          const data = {
            name: values.name,
            surname: values.surname,
            password: values.password,
            email: values.email
          };
          API.signup(data).then(() => {window.location.href = redirectUrl});
        } catch (e) {
          alert(e.message);
        }
        actions.setSubmitting(false);
      }}
      validationSchema={yup.object(validationSchema)}
      initialValues={initialValues}
    >
      {(props: FormikProps<any>) => (
          <Form>
            <Field type="text" name='name' label={t("name")} />
            <Field type="text" name='surname' label={t("surname")} />
            <Field type="email" name='email' label={t("email")} />
            <Field type="password" name='password' label={t("password")} />
            <Paragraph color='disabledFont' small>{t("password-requirements")}</Paragraph>
            <Checkbox name='subscribe' label={t("accept-to-receive-email")} />
            <Button size='block' htmlType='submit' flat disabled={props.isSubmitting || !props.dirty || !props.isValid }>
              {(props.isSubmitting) ? '...wait' : t("signup-now")}
            </Button>
            <Paragraph color='disabledFont' small>{t("clicking-button-you-accept-tos")}</Paragraph>
          </Form>
      )}
    </Formik>
  )
}
