import {
  Pagination,
  Table,
  TableType,
  SortTableSelect,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useGetUsersMeCampaignsQuery } from "src/services/tryberApi";
import React, { useEffect, useState } from "react";
import { Order } from "@appquality/appquality-design-system/dist/stories/table/_types";
import dateFormatter from "src/utils/dateFormatter";

const ClosedCampaignsTable = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<Order>("DESC");
  const [orderBy, setOrderBy] = useState<"end_date" | "close_date">("end_date");
  const [tableRows, setTableRows] = useState<TableType.Row[]>([]);
  const limit = 10;
  const { data, isLoading } = useGetUsersMeCampaignsQuery({
    start: (page - 1) * limit,
    limit: limit,
    filterBy: {
      accepted: "1",
      statusId: "2",
    },
    order: order,
    orderBy: orderBy,
  });
  useEffect(() => {
    const campaigns = data?.results?.map((cp) => {
      return {
        key: cp.id ? cp.id : 123,
        campaigns: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
        closeDate: dateFormatter(cp.dates.close),
      };
    });
    setTableRows(campaigns || []);
  }, [data?.results]);
  const columns: TableType.Column[] = [
    {
      title: t("Campaign"),
      dataIndex: "campaigns",
      key: "campaigns",
      role: "title",
      hideIndex: true,
    },
    {
      title: t("Close Date"),
      dataIndex: "closeDate",
      key: "closeDate",
      isSortable: true,
      onSort: (sorting: OrderType) => {
        setOrder(sorting);
        setOrderBy("close_date");
      },
    },
  ];
  return (
    <>
      <SortTableSelect
        order={order}
        orderBy={orderBy}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
      <Table
        dataSource={tableRows}
        isLoading={isLoading}
        isStriped={true}
        order={order}
        orderBy={orderBy}
        i18n={{
          loading: t("Loading Data"),
          empty: t(
            "No campaign has been completed yet. It's time to get to work: finish the active ones or apply in the available campaigns!"
          ),
        }}
        columns={columns}
      />
      {(data?.total || 0) > limit ? (
        <Pagination
          className="aq-pt-3"
          onPageChange={setPage}
          current={page}
          maxPages={Math.ceil((data?.total || 0) / limit)}
        />
      ) : null}
    </>
  );
};

export default ClosedCampaignsTable;
