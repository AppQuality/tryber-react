import React from "react";
import {BSCol, Container} from "../stories/layout/Layout";
import {Column, Row, Table, TableProps} from "../stories/table/Table";
import {Card} from "../stories/card/Card";
import {Button} from "../stories/button/Button";

export default function TestTables() {
  const dataSource: Row[] = [
    {
      key: '160836',
      id: '160836',
      title: '[registrazione/form] - Nel momento in cui tarapia tapioco come se fosse antani',
      severity: 'High',
      state: 'Critical'
    },
    {
      key: '161236',
      id: '161236',
      title: '[registrazione/form] - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolorem error et illum ipsam iure',
      severity: 'Normal',
      state: 'this is a Critical bug'
    },
    {
      key: '770836',
      id: '770836',
      title: '[registrazione/form] - Cum dolorem error et illum ipsam iure',
      severity: 'Normal',
      state: 'Critical',
      action: <Button type='link' size='sm'>view more</Button>,
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
  return (
    <Container>
      <h2>Dashboard</h2>
      <BSCol size='col-lg-9'>
        <Card>
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </BSCol>
    </Container>
  );
}
