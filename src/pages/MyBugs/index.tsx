import {
  BSCol,
  BSGrid,
  Card,
  TableType,
} from "@appquality/appquality-design-system";
import queryString from "query-string";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { useMyBugs } from "./effects/useMyBugs";
import MyBugsFilters from "./MyBugsFilters";
import MyBugsTable from "./MyBugsTable";

export default function MyBugs() {
  const { search } = useLocation();
  const { t } = useTranslation();
  const {
    data,
    page,
    totalBugs,
    limit,
    campaigns,
    severities,
    status,
    loading,
    order,
    orderBy,
  } = useMyBugs();

  useEffect(() => {
    const values = queryString.parse(search);
    if (values.cp) {
      campaigns.setSelected({ value: values.cp.toString(), label: "" });
    }
    if (values.status) {
      status.setSelected({ value: values.status.toString(), label: "" });
    }
  }, [queryString]);

  const columns: TableType.Column[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      isSortable: true,
      onSort: (sorting: OrderType) => {
        order.set(sorting);
        orderBy.set("id");
      },
      role: "overline",
    },
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      isSortable: true,
      onSort: (sorting: OrderType) => {
        order.set(sorting);
        orderBy.set("title");
      },
      role: "title",
    },
    {
      title: t("Severity"),
      dataIndex: "severity",
      key: "severity",
    },
    {
      title: t("Status"),
      dataIndex: "status",
      key: "status",
    },
    {
      title: t("Action"),
      dataIndex: "action",
      key: "action",
      align: "center",
      role: "cta",
      hideIndex: true,
    },
  ];
  return (
    <PageTemplate title={t("Uploaded Bugs")} route={"my-bugs"} shouldBeLoggedIn>
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <Card className="aq-mb-3" title={t("Submitted bugs")}>
            <MyBugsTable
              data={data.current}
              page={page.current}
              setPage={page.set}
              totalBugs={totalBugs}
              limit={limit.current}
              loading={loading}
              columns={columns}
            />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <Card
            className="stick-to-header-lg aq-mb-3"
            title={t("Filters")}
            shadow={true}
          >
            <MyBugsFilters
              campaigns={campaigns}
              severities={severities}
              status={status}
              order={order.current}
              orderBy={orderBy.current}
              columns={columns}
            />
          </Card>
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
