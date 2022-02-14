import {
  Table,
  Pagination,
  TableType,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { SetStateAction, Dispatch } from "react";
import { BugsOrderByType } from "src/pages/MyBugs/effects/useMyBugs";

interface MyBugsTableProps {
  data: TableType.Row[];
  page: number;
  setPage: (page: number) => void;
  totalBugs: number;
  limit: number;
  loading: boolean;
  columns: TableType.Column[];
  order: {
    current: OrderType;
    set: Dispatch<SetStateAction<OrderType>>;
  };
  orderBy: {
    current: BugsOrderByType;
    set: Dispatch<SetStateAction<BugsOrderByType>>;
  };
}

const MyBugsTable = ({
  data,
  page,
  setPage,
  totalBugs,
  limit,
  order,
  orderBy,
  loading,
  columns,
}: MyBugsTableProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Table
        className="aq-mb-3"
        dataSource={data}
        columns={columns}
        orderBy={orderBy.current}
        order={order.current}
        isLoading={loading}
        isStriped
      />
      <Pagination
        className="aq-pt-3"
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
