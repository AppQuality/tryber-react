import { Story, Meta } from "@storybook/react";
import { Header } from "./Header";
import { HeaderProps } from "./_types";
import { testUser } from "./_data";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedOutHeader = Template.bind({});
LoggedOutHeader.args = {
  isLoading: false,
};

export const LoggedInHeader = Template.bind({});
LoggedInHeader.args = {
  isLoading: false,
  user: testUser,
};

export const LoadingHeader = Template.bind({});
LoadingHeader.args = {
  isLoading: true,
};
