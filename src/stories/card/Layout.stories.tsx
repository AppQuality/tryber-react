import React from "react";
import { Card, CardProps } from "./Card";
import {Story, Meta} from "@storybook/react";

export default {
  title: "Card",
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;
