import React from "react";
import { BSGrid, LayoutProps } from "./Layout";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Layout",
  component: BSGrid,
} as Meta;

const Template: Story<LayoutProps> = (args) => <BSGrid {...args} />;
