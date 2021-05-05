import { Field, FieldInterface } from "./Form";
import {Story, Meta} from "@storybook/react";
import { Formik, Form } from "formik";

export default {
  title: "Forms",
  component: Field,
} as Meta;

const Template: Story<FieldInterface> = (args) => (
  <Formik initialValues={{text:''}}  onSubmit={(data)=>{console.log(data)}}>
    <Form>
      <Field {...args} />
    </Form>
  </Formik>
);

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  name: 'test'
};


// export const Small = Template.bind({});
// Small.args = {
//   size: "sm",
//   children: 'click'
// };
