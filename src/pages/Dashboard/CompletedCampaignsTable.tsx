import {
  Pagination,
  Table,
  TableType,
  SortTableSelect,
  Button,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useGetUsersMeCampaignsQuery } from "src/services/tryberApi";
import React, { useEffect, useState } from "react";
import { Order } from "@appquality/appquality-design-system/dist/stories/table/_types";
import dateFormatter from "src/utils/dateFormatter";

const CompletedCampaignsTable = () => {
  const { t, i18n } = useTranslation();
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
      statusId: "1",
      completed: "1",
    },
    order: order,
    orderBy: orderBy,
  });
  useEffect(() => {
    const campaigns = data?.results?.map((cp) => {
      let manualLink = "#";
      if (typeof cp.manual_link !== "undefined") {
        if (
          i18n.language === "en" &&
          cp.manual_link.en &&
          cp.manual_link.en !== "#"
        )
          manualLink = cp.manual_link.en;
        if (
          i18n.language === "it" &&
          cp.manual_link.it &&
          cp.manual_link.it !== "#"
        )
          manualLink = cp.manual_link.it;
      }
      return {
        key: cp.id ? cp.id : 123,
        campaigns: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
        endDate: dateFormatter(cp.dates.end),
        closeDate: dateFormatter(cp.dates.close),
        actions: {
          title: ``,
          content: (
            <Button
              forwardedAs="a"
              disabled={manualLink === "#"}
              className="aq-nopadding"
              href={
                manualLink === "#"
                  ? "#"
                  : `${window.location.origin}${manualLink}`
              }
              type="link-hover"
              size="sm"
            >
              {t("Review the manual")}
            </Button>
          ),
        },
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
      title: t("End Date"),
      dataIndex: "endDate",
      key: "endDate",
      isSortable: true,
      onSort: (sorting: "ASC" | "DESC") => {
        setOrder(sorting);
        setOrderBy("end_date");
      },
    },
    {
      title: t("Action"),
      dataIndex: "actions",
      key: "actions",
      align: "center",
      role: "cta",
      hideIndex: true,
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
            "There are currently no completed campaigns. You can relax, finish the active ones or apply in the new available campaigns!"
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

export default CompletedCampaignsTable;
