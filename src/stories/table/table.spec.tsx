import { render } from "@testing-library/react";
import {ThemeProvider} from "styled-components";
import {aqBootstrapTheme} from "../theme/defaultTheme";
import {Column, Row, Table, } from "./Table";
import {Button} from "../button/Button";
import React from "react";

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

describe('Table should render data correctly', () => {
  it('There should be as many tbody tr as object in parameter dataSource',() => {
    const {container} = render(
      <ThemeProvider theme={aqBootstrapTheme}>
        <Table dataSource={dataSource} columns={columns} />
      </ThemeProvider>
    );
    const tr = container.querySelectorAll('tbody tr');
    expect(tr.length).toEqual(dataSource.length);
  });
  it('There should be as many thead th as columns in parameters', () => {
    const {container} = render(
      <ThemeProvider theme={aqBootstrapTheme}>
        <Table dataSource={dataSource} columns={columns} />
      </ThemeProvider>
    );
    const th = container.querySelectorAll('thead th');
    expect(th.length).toEqual(columns.length);
  });

});

describe('If no data is provided', () => {
  it('Table should render an empty placeholder', () => {
    const {container} = render(
      <ThemeProvider theme={aqBootstrapTheme}>
        <Table dataSource={[]} columns={columns} />
      </ThemeProvider>
    );
    const placeholder = container.querySelectorAll('.aq-table-empty-placeholder');
    expect(placeholder.length).toEqual(1);
  });
});