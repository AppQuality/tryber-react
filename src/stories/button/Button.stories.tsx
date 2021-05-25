import { Button } from "./Button";
import { ButtonProps } from "./ButtonProps";
import { Story, Meta } from "@storybook/react";
import { Search } from "react-bootstrap-icons";
import { ThemeProvider } from "styled-components";
import { aqBootstrapTheme } from "../theme/defaultTheme";

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <ThemeProvider theme={aqBootstrapTheme}>
    <Button {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
  children: "click",
  onClick: () => alert("clicked!"),
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary",
  children: "click",
  onClick: () => alert("clicked!"),
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  children: "click",
  onClick: () => alert("clicked!"),
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  children: "click",
  onClick: () => alert("clicked!"),
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: <Search />,
};
