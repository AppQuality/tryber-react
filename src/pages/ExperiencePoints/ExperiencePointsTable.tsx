import {
  Table,
  Pagination,
  TableType,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

interface ExperiencePointsTableProps {
  data: TableType.Row[];
  page: number;
  setPage: (page: number) => void;
  totalEntries: number;
  limit: number;
  loading: boolean;
  order: any;
  orderBy: any;
}

const ExperiencePointsTable = ({
  data,
  page,
  setPage,
  totalEntries,
  limit,
  loading,
  order,
  orderBy,
}: ExperiencePointsTableProps) => {
  const { t } = useTranslation();
  const columns: TableType.Column[] = [
    {
      title: t("Points"),
      dataIndex: "amount",
      key: "amount",
      maxWidth: "10ch",
      isSortable: true,
      onSort: (sorting: "ASC" | "DESC") => {
        order.set(sorting);
        orderBy.set("amount");
      },
    },
    {
      title: t("Date"),
      dataIndex: "date",
      key: "date",
      maxWidth: "8ch",
      isSortable: true,
      onSort: (sorting: "ASC" | "DESC") => {
        order.set(sorting);
        orderBy.set("date");
      },
    },
    {
      title: t("Activity"),
      dataIndex: "activity",
      key: "activity",
      maxWidth: "10ch",
    },
    {
      title: t("Campaign"),
      dataIndex: "campaign",
      key: "campaign",
      maxWidth: "8ch",
    },
    {
      title: t("Reason"),
      dataIndex: "note",
      key: "note",
      maxWidth: "50ch",
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
        maxPages={Math.ceil(totalEntries / limit)}
        mobileText={(current, total) =>
          t(`Page %current% / %total%`)
            .replace("%current%", current.toString())
            .replace("%total%", total ? total.toString() : "0")
        }
      />
    </>
  );
};

export default ExperiencePointsTable;
