import {
  Table,
  Pagination,
  TableType,
  SortTableSelect,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";

interface ExperiencePointsTableProps {
  data: TableType.Row[];
  page: number;
  setPage: (page: number) => void;
  totalEntries: number;
  limit: number;
  loading: boolean;
  columns: TableType.Column[];
  order: ApiComponents["parameters"]["order"];
  orderBy: string;
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
  columns,
}: ExperiencePointsTableProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SortTableSelect
        order={order}
        orderBy={orderBy}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
      <Table
        dataSource={data}
        columns={columns}
        orderBy={orderBy}
        order={order}
        isLoading={loading}
        className="aq-mb-3"
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
