import {
  Pagination,
  Table,
  TableType,
  SortTableSelect,
  Text,
  Button,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useGetUsersMeCampaignsQuery } from "src/services/tryberApi";
import DashboardHelpStore from "src/redux/dashboardHelpModal";
import { useEffect, useState } from "react";
import { Order } from "@appquality/appquality-design-system/dist/stories/table/_types";
import dateFormatter from "src/utils/dateFormatter";

const ActiveCampaignsTable = () => {
  const { t, i18n } = useTranslation();
  const { open } = DashboardHelpStore();
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<Order>("ASC");
  const [orderBy, setOrderBy] = useState<
    "name" | "start_date" | "end_date" | "close_date"
  >("start_date");
  const [tableRows, setTableRows] = useState<TableType.Row[]>([]);
  const limit = 10;

  const { data, isLoading } = useGetUsersMeCampaignsQuery({
    start: (page - 1) * limit,
    limit: limit,
    filterBy: {
      accepted: "1",
      completed: "0",
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
        if (
          i18n.language === "es" &&
          cp.manual_link.es &&
          cp.manual_link.es !== "#"
        )
          manualLink = cp.manual_link.es;
      }

      return {
        key: cp.id ? cp.id : 123,
        campaigns: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
        startDate: dateFormatter(cp.dates.start),
        endDate: dateFormatter(cp.dates.end),
        actions: {
          title: ``,
          content:
            manualLink === "#" ? (
              <>
                <Text as="span" className="aq-text-disabled-dark" small>
                  <b>{t("Coming soon")}</b>
                </Text>{" "}
                <Text as="span" small>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      open();
                    }}
                  >
                    (?)
                  </a>
                </Text>
              </>
            ) : (
              <Button
                className="aq-nopadding"
                forwardedAs="a"
                href={`${window.location.origin}${manualLink}`}
                type="link-hover"
                size="sm"
              >
                {t("Read manual")}
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
      title: t("Start Date"),
      dataIndex: "startDate",
      key: "startDate",
      isSortable: true,
      onSort: (sorting: "ASC" | "DESC") => {
        setOrder(sorting);
        setOrderBy("start_date");
      },
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
      role: "cta",
      hideIndex: true,
      align: "center",
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
            "You are not currently selected for any campaigns. Apply in available campaigns to participate in upcoming ones!"
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

export default ActiveCampaignsTable;
