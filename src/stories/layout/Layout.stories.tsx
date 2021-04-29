import React from "react";
import { Grid, LayoutProps } from "./Layout";
import {Story, Meta} from "@storybook/react";

export default {
  title: "Layout",
  component: Grid,
} as Meta;

const Template: Story<LayoutProps> = (args) => <Grid {...args} />;
