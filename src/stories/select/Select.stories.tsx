import {BSCol, Container} from "../layout/Layout"
import {Card} from "../card/Card"
import {Select, SelectProps} from "./Select"
import {Story, Meta} from "@storybook/react"
import {aqBootstrapTheme} from "../theme/defaultTheme";
import {ThemeProvider} from "styled-components";

export default {
  title: "Select",
  component: Select,
} as Meta;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];


const Template: Story<SelectProps> = (args) => {
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <Container>
        <BSCol size='col-lg-9'>
          <Card>
            <Select {...args} />
          </Card>
        </BSCol>
      </Container>
    </ThemeProvider>
  );
};

export const SelectBase = Template.bind({});
SelectBase.args = {
  options: options,
  isSearch: true
};
