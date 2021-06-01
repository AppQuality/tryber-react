import { Table } from "../../stories/table/Table";
import { Pagination } from "../../stories/pagination/Pagination";
import { Column, Row } from "../../stories/table/_types";

interface MyBugsTableProps {
  data: Row[];
  page: number;
  setPage: (page: number) => void;
  totalBugs: number;
  limit: number;
  loading: boolean;
  order: any;
  orderBy: any;
}

const MyBugsTable = ({
  data,
  page,
  setPage,
  totalBugs,
  limit,
  loading,
  order,
  orderBy,
}: MyBugsTableProps) => {
  const columns: Column[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "8ch",
      isSortable: true,
      onSort: (sorting: "ASC" | "DESC") => {
        order.set(sorting);
        orderBy.set("id");
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "50ch",
      isSortable: true,
      onSort: (sorting: "ASC" | "DESC") => {
        order.set(sorting);
        orderBy.set("title");
      },
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      width: "10ch",
    },
    {
      title: "State",
      dataIndex: "status",
      key: "status",
      width: "10ch",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10ch",
      align: "center",
    },
  ];
  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        orderBy={orderBy.current}
        order={order.current}
        isLoading={loading}
        isStriped
      />
      <Pagination
        onPageChange={setPage}
        current={page}
        maxPages={Math.ceil(totalBugs / limit)}
      />
    </>
  );
};

export default MyBugsTable;
