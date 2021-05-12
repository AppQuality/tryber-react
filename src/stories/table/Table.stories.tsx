import {BSCol, Container} from "../layout/Layout"
import {Card} from "../card/Card"
import {Button, ButtonProps} from "../button/Button"
import { Table, TableProps, Column, Row } from "./Table"
import {Story, Meta} from "@storybook/react"
import {aqBootstrapTheme} from "../theme/defaultTheme";
import {ThemeProvider} from "styled-components";
import React from "react";

export default {
  title: "Table",
  component: Table,
} as Meta;

const dataSource: Row[] = [
  {
    key: '160836',
    id: '160836',
    title: '[registrazione/form] - Nel momento in cui tarapia tapioco come se fosse antani',
    severity: 'High',
    state: 'Critical',
    action: <Button type='link' size='sm'>view more</Button>,
  },
  {
    key: '161236',
    id: '161236',
    title: '[registrazione/form] - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolorem error et illum ipsam iure',
    severity: 'Normal',
    state: 'this is a Critical bug',
    action: <Button type='link' size='sm'>view more</Button>
  },
  {
    key: '770836',
    id: '770836',
    title: '[registrazione/form] - Cum dolorem error et illum ipsam iure',
    severity: 'Normal',
    state: 'Critical',
    action: <Button type='link' size='sm'>view more</Button>
  },
];
const columns: Column[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    long: true
  },
  {
    title: 'Severity',
    dataIndex: 'severity',
    key: 'severity',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '110px'
  }
];

const Template: Story<TableProps> = (args) => {
  return (
    <ThemeProvider theme={aqBootstrapTheme}>
      <Container>
        <BSCol size='col-lg-9'>
          <Card>
            <Table {...args} />
          </Card>
        </BSCol>
      </Container>
    </ThemeProvider>
  );
};

export const TableWithData = Template.bind({});
TableWithData.args = {
  dataSource: dataSource,
  columns: columns,
  isLoading: false
};

export const TableEmpty = Template.bind({});
TableEmpty.args = {
  dataSource: [],
  columns: columns,
  isLoading: false
};

export const TableLoading = Template.bind({});
TableLoading.args = {
  dataSource: dataSource,
  columns: columns,
  isLoading: true
};
