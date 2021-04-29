import React from "react";
import { Input, InputInterface } from "./Form";
import {Story, Meta} from "@storybook/react";

export default {
  title: "Forms",
  component: Input,
} as Meta;

const Template: Story<InputInterface> = (args) => <Input {...args} />;

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
