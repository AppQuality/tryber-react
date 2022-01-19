import {
  Table,
  Pagination,
  TableType,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

interface MyBugsTableProps {
  data: TableType.Row[];
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
  const { t } = useTranslation();
  const columns: TableType.Column[] = [
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
      title: t("Title"),
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
      title: t("Severity"),
      dataIndex: "severity",
      key: "severity",
      width: "10ch",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
      width: "10ch",
    },
    {
      title: t("Action"),
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
        mobileText={(current, total) =>
          t(`Page %current% / %total%`)
            .replace("%current%", current.toString())
            .replace("%total%", total ? total.toString() : "0")
        }
      />
    </>
  );
};

export default MyBugsTable;
