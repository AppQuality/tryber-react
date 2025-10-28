import { Pagination, Table } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { currencyTable } from "src/redux/wallet/utils";
import { useGetUsersMePendingBootyQuery } from "src/services/tryberApi";
import { useExpiredTabColumns } from "./useExpiredTabColumns";

const useExpiredRows = ({ start, limit }: { start: number; limit: number }) => {
  const { data: expiredBootyData, isLoading: isExpiredBootyLoading } =
    useGetUsersMePendingBootyQuery({
      filterBy: { isExpired: 1 },
      start,
      limit,
    });
  return {
    expiredBootyData: (expiredBootyData?.results || []).map((req) => {
      const attributionDate = new Date(req.attributionDate);
      const expiredDate = new Date(attributionDate);
      expiredDate.setMonth(expiredDate.getMonth() + 12);
      return {
        key: req.id,
        activityName: {
          title: req.name,
          content: <span>{req.name}</span>,
        },
        activityType: {
          title: req.activity,
          content: <span>{req.activity}</span>,
        },
        attributionDate: {
          title: req.attributionDate,
          content: (
            <span>
              {new Date(req.attributionDate).toLocaleDateString("it-IT")}
            </span>
          ),
        },
        gross: {
          title: "€ " + req.amount?.gross?.value,
          content: (
            <span>
              {req.amount?.gross?.currency &&
              req.amount?.gross?.currency in currencyTable
                ? currencyTable[req.amount?.gross?.currency]
                : req.amount?.gross?.currency}{" "}
              {req.amount?.gross?.value?.toFixed(2)}
            </span>
          ),
        },
        expiredDate: {
          title: expiredDate.toISOString().split("T")[0],
          content: <span>{expiredDate.toLocaleDateString("it-IT")}</span>,
        },
      };
    }),
    isExpiredBootyLoading,
  };
};

const ExpiredAttributionTable = ({
  className,
  start,
  limit,
}: {
  className?: string;
  start: number;
  limit: number;
}) => {
  const { t } = useTranslation();

  const expiredColumns = useExpiredTabColumns();

  const { expiredBootyData: expiredRows, isExpiredBootyLoading } =
    useExpiredRows({
      start,
      limit,
    });
  return (
    <Table
      className={`${className || ""} wallet-table`}
      dataSource={expiredRows}
      columns={expiredColumns}
      isLoading={isExpiredBootyLoading}
      isStriped
      i18n={{
        loading: t("...wait"),
        empty: t("__WALLET_HOME-EMPTY_STATE_MAX: 105"),
      }}
    />
  );
};

const ExpiredAttributionTablePagination = ({
  className,
  start,
  limit,
  maxPages,
  changePagination,
}: {
  className?: string;
  start: number;
  limit: number;
  maxPages: number;
  changePagination: (newPage: number) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Pagination
      className={className}
      onPageChange={changePagination}
      current={start / limit + 1}
      maxPages={maxPages}
      mobileText={(current, total) =>
        t(`Page %current% / %total%`)
          .replace("%current%", current.toString())
          .replace("%total%", total ? total.toString() : "0")
      }
    />
  );
};
export { ExpiredAttributionTablePagination };
export default ExpiredAttributionTable;
