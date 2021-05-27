import { Table } from "../../stories/table/Table";
import { Pagination } from "../../stories/pagination/Pagination";
import { useMyBugs } from "../../store/useMyBugs";

const MyBugsTable = ({ data, page, totalBugs, limit }: any) => {
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
      <Table dataSource={data.current} columns={columns} />
      <Pagination
        onPageChange={() => {
          alert("change");
        }}
        current={page.current}
        maxPages={Math.ceil(totalBugs / limit.current)}
      />
    </>
  );
};

export default MyBugsTable;
