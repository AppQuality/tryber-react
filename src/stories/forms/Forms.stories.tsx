import React from "react";
import { Input, InputInterface } from "./Forms";
import {Story, Meta} from "@storybook/react";

export default {
  title: "Example/Forms",
  component: Input,
} as Meta;

const Template: Story<InputInterface> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'text',
  name: 'test'
};


// export const Small = Template.bind({});
// Small.args = {
//   size: "sm",
//   children: 'click'
// };
