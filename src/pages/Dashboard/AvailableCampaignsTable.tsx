import {
  Pagination,
  Table,
  TableType,
  SortTableSelect,
  Button,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useGetUsersMeCampaignsQuery } from "src/services/tryberApi";
import dateFormatter from "src/utils/dateFormatter";

const AvailableCampaignsTable = () => {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<OrderType>("ASC");
  const [orderBy, setOrderBy] = useState<"start_date" | "end_date">("end_date");
  const [tableRows, setTableRows] = useState<TableType.Row[]>([]);
  const limit = 10;
  const { data, isLoading } = useGetUsersMeCampaignsQuery({
    start: (page - 1) * limit,
    limit: limit,
    filterBy: {
      completed: "0",
    },
    order: order,
    orderBy: orderBy,
  });
  useEffect(() => {
    const campaigns = data?.results?.map((cp) => {
      let previewLink = "#";
      if (cp.preview_link) {
        if (
          cp.preview_link.it &&
          i18n.language === "it" &&
          cp.preview_link.it !== "#"
        )
          previewLink = `${window.location.origin}${cp.preview_link.it}`;
        if (
          cp.preview_link.it &&
          i18n.language === "en" &&
          cp.preview_link.en !== "#"
        )
          previewLink = `${window.location.origin}${cp.preview_link.en}`;
        if (
          cp.preview_link.es &&
          i18n.language === "es" &&
          cp.preview_link.es !== "#"
        )
          previewLink = `${window.location.origin}${cp.preview_link.es}`;
      }
      return {
        key: cp.id ? cp.id : 0,
        campaignName: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
        type: cp.campaign_type,
        startDate: dateFormatter(cp.dates.start),
        endDate: dateFormatter(cp.dates.end),
        actions: {
          title: ``,
          content: (
            <Button
              className="aq-nopadding"
              disabled={previewLink === "#"}
              forwardedAs="a"
              href={previewLink}
              type="link-hover"
              size="sm"
            >
              {previewLink === "#"
                ? t("Not available")
                : cp.applied
                ? t("View")
                : t("Apply now")}
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
      dataIndex: "campaignName",
      key: "campaignName",
      role: "title",
      hideIndex: true,
    },
    {
      title: t("Type"),
      dataIndex: "type",
      key: "type",
      role: "overline",
      hideIndex: true,
    },
    {
      title: t("Start Date"),
      dataIndex: "startDate",
      key: "startDate",
      isSortable: true,
      onSort: (sorting: OrderType) => {
        setOrder(sorting);
        setOrderBy("start_date");
      },
    },
    {
      title: t("End Date"),
      dataIndex: "endDate",
      key: "endDate",
      isSortable: true,
      onSort: (sorting: OrderType) => {
        setOrder(sorting);
        setOrderBy("end_date");
      },
    },
    {
      title: t("Action"),
      dataIndex: "actions",
      key: "actions",
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
            "There are no new campaigns available at this time, please keep your profile and devices updated and look forward to new activities."
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

export default AvailableCampaignsTable;
