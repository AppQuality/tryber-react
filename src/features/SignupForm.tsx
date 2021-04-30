import React, {useState} from 'react'
import {Checkbox, Field} from "../stories/form/Form"
import {Button} from "../stories/button/Button"
import {Formik, Form} from "formik"
import * as yup from 'yup'
import { useTranslation } from 'react-i18next';
import API from '../utils/api'
import {Paragraph} from "../stories/typography/Typography";

export const SignupForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
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
    subscribe: yup.boolean().oneOf([true], 'Must Accept Terms and Conditions')
  }
  return (
    <Formik
      onSubmit={async values => {
        setSubmitting(true);
        try {
          const data = {
            name: values.name,
            surname: values.surname,
            password: values.password,
            email: values.email
          };
          const res = await API.signup(data);
          if (i18n.language === 'en') window.location.assign('https://crowd.app-quality.com/my-dashboard/')
          if (i18n.language === 'it') window.location.assign('https://crowd.app-quality.com/it/la-mia-dashboard/')
        } catch (e) {
          alert(e.message);
        }
        setSubmitting(false);
      }}
      validationSchema={yup.object(validationSchema)}
      initialValues={initialValues}
    >
      <Form>
        <Field type="text" name='name' label={t("name")} />
        <Field type="text" name='surname' label={t("surname")} />
        <Field type="email" name='email' label={t("email")} />
        <Field type="password" name='password' label={t("password")} />
        <Paragraph>{t("password-requirements")}</Paragraph>
        <Checkbox name='subscribe' label={t("accept-to-receive-email")} />
        <Button htmlType='submit' disabled={isSubmitting}>
          {(isSubmitting) ? '...wait' : t("signup-now")}
        </Button>
        <Paragraph>{t("clicking-button-you-accept-tos")}</Paragraph>
      </Form>
    </Formik>
  )
}
