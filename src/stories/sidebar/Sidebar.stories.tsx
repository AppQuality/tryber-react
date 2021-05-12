import { Sidebar, SidebarProps } from "./Sidebar";
import { Story, Meta } from "@storybook/react";
import { HouseFill, PersonFill, Laptop } from "react-bootstrap-icons";
import { ThemeProvider } from "styled-components";
import { aqBootstrapTheme } from "../theme/defaultTheme";

export default {
  title: "Sidebar",
  component: Sidebar,
} as Meta;

const Template: Story<SidebarProps> = (args) => (
  <ThemeProvider theme={aqBootstrapTheme}>
    <Sidebar {...args} />
  </ThemeProvider>
);

export const BasicSidebar = Template.bind({});
BasicSidebar.args = {
  open: false,
  languages: {
    current: {lang:'it'},
    others: [{lang:'en'},{lang:'es'}]
  },
  items: [
    {
      url: "#",
      icon: <HouseFill />,
      active: true,
      text: "Dashboard",
    },
    {
      url: "#",
      icon: <PersonFill />,
      active: false,
      text: "Profilo",
    },
    {
      url: "#",
      icon: <Laptop />,
      active: false,
      text: "Dispositivi",
    },
  ],
};
