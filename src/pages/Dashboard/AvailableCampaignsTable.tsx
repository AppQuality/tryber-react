import {
  Pagination,
  Table,
  TableType,
  SortTableSelect,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import useAvailableCampaigns from "./effects/useAvailableCampaigns";

const AvailableCampaignsTable = () => {
  const { t } = useTranslation();
  const { campaigns, page, totalEntries, limit, loading, order, orderBy } =
    useAvailableCampaigns();
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
        order.set(sorting);
        orderBy.set("startDate");
      },
    },
    {
      title: t("End Date"),
      dataIndex: "endDate",
      key: "endDate",
      isSortable: true,
      onSort: (sorting: OrderType) => {
        order.set(sorting);
        orderBy.set("endDate");
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
        order={order.current}
        orderBy={orderBy.current}
        columns={columns}
        label={t("Order By", { context: "Sort Table Select" })}
      />
      <Table
        dataSource={campaigns}
        isLoading={loading}
        isStriped={true}
        order={order.current}
        orderBy={orderBy.current}
        i18n={{
          loading: t("Loading Data"),
          empty: t(
            "There are no new campaigns available at this time, please keep your profile and devices updated and look forward to new activities."
          ),
        }}
        columns={columns}
      />
      {totalEntries > limit ? (
        <Pagination
          className="aq-pt-3"
          onPageChange={page.set}
          current={page.current}
          maxPages={Math.ceil(totalEntries / limit)}
        />
      ) : null}
    </>
  );
};

export default AvailableCampaignsTable;
