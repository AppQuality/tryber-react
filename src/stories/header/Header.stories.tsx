import React from "react";
import { Header, HeaderProps } from "./Header";
import {Story, Meta} from "@storybook/react";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Example = Template.bind({});
Example.args = {};
