import { Story, Meta } from "@storybook/react";
import { Pagination } from "./Pagination";
import { PaginationProps } from "./PaginationProps";

export default {
  title: "Pagination",
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => <Pagination {...args} />;

export const BasicPagination = Template.bind({});
BasicPagination.args = {
  maxPages: 10,
  current: 2,
  onPageChange: (page: Number) => {
    alert(`Going to page ${page}`);
  },
};
