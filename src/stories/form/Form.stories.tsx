import { Field, FieldInterface } from "./Form"
import {Story, Meta} from "@storybook/react"
import { Formik, Form } from "formik"
import styled from "styled-components";

export default {
  title: "Forms",
  component: Field,
} as Meta;

export const Template: Story = () => (
  <Formik initialValues={{text:''}}  onSubmit={(data)=>{console.log(data)}}>
    <Form>
      <Field type='text' name='text' />
      <Field type='search' name='search' />
    </Form>
  </Formik>
);


