import {BSCol, Container} from "../layout/Layout"
import {Card} from "../card/Card"
import {GetOptionsAsync, Select, SelectProps} from "./Select"
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

const groupedOptions = [
  { label: 'A',
    options: [
      {value: "ocean", label: "Ocean"},
      {value: "blue", label: "Blue", isDisabled: true},
      {value: "purple", label: "Purple"},
      {value: "red", label: "Red", isFixed: true},
      {value: "orange", label: "Orange"},
      {value: "yellow", label: "Yellow"},
      {value: "green", label: "Green"},
      {value: "forest", label: "Forest"},
      {value: "slate", label: "Slate"},
      {value: "silver", label: "Silver"},
   ]
  },
  {label: 'B',
    options: [
      {value: "vanilla", label: "Vanilla", rating: "safe"},
      {value: "chocolate", label: "Chocolate", rating: "good"},
      {value: "strawberry", label: "Strawberry", rating: "wild"},
      {value: "salted-caramel", label: "Salted Caramel", rating: "safe"},
   ]
  }
]

// const getAsyncOptions: GetOptionsAsync = () => {
//   return new Promise<Option[]>()
// }

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
  options: options
};

export const GroupedAsync = Template.bind({});
GroupedAsync.args = {
  options: groupedOptions,
  isSearchable: true
};

// export const SelectAsync = Template.bind({});
// SelectAsync.args = {
//   options: getAsyncOptions,
//   isSearchable: true
// }