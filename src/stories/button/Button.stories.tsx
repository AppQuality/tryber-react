import React from "react";
import { Button, ButtonProps } from "./Button";
import {Story, Meta} from "@storybook/react";

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  children: 'click'
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  children: 'click'
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  children: 'click'
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  children: 'click'
};
