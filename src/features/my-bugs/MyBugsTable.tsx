import { Table } from "../../stories/table/Table";
import { Pagination } from "../../stories/pagination/Pagination";
import { Row } from "../../stories/table/_types";

interface MyBugsTableProps {
  data: Row[];
  page: number;
  setPage: (page: number) => void;
  totalBugs: number;
  limit: number;
  loading: boolean;
}

const MyBugsTable = ({
  data,
  page,
  setPage,
  totalBugs,
  limit,
  loading,
}: MyBugsTableProps) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "8ch",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "50ch",
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
      width: "8ch",
    },
    {
      title: "State",
      dataIndex: "status",
      key: "status",
      width: "8ch",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "8ch",
    },
  ];
  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
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
