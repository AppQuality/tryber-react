import { Header, HeaderProps, User } from "./Header";
import { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { aqBootstrapTheme } from "../theme/defaultTheme";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => (
  <ThemeProvider theme={aqBootstrapTheme}>
    <Header {...args} />
  </ThemeProvider>
);
export const LoggedOutHeader = Template.bind({});
LoggedOutHeader.args = {};

const testUser: User = {
  id: 1234,
  username: "testuser0001",
  name: "test",
  surname: "user",
  email: "testuser@email.it",
  image:
    "https://secure.gravatar.com/avatar/45396ba87c1cf9397abba7f834b1d31c?s=96&d=http%3A%2F%2Fcrowd.app-quality.com%2Fwp-content%2Fthemes%2Fcrowdappquality%2Fimg%2FAQavatar.png&r=g",
};
export const LoggedInHeader = Template.bind({});
LoggedInHeader.args = {
  user: testUser,
};
