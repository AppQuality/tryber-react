import { Table } from "../../stories/table/Table";
import { Pagination } from "../../stories/pagination/Pagination";
import { Row } from "../../stories/table/_types";

interface MyBugsTableProps {
  data: Row[];
  page: number;
  totalBugs: number;
  limit: number;
}

const MyBugsTable = ({ data, page, totalBugs, limit }: MyBugsTableProps) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      long: true,
    },
    {
      title: "Severity",
      dataIndex: "severity",
      key: "severity",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "110px",
    },
  ];
  return (
    <>
      <Table dataSource={data} columns={columns} />
      <Pagination
        onPageChange={() => {
          alert("change");
        }}
        current={page}
        maxPages={Math.ceil(totalBugs / limit)}
      />
    </>
  );
};

export default MyBugsTable;
