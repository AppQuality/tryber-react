import { Pagination, Table } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import useAvailableCampaigns from "./effects/useAvailableCampaigns";

const AvailableCampaignsTable = () => {
  const { t } = useTranslation();
  const { campaigns, page, totalEntries, limit, loading, order, orderBy } =
    useAvailableCampaigns();

  return (
    <>
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
        columns={[
          {
            title: t("Campaign"),
            dataIndex: "campaignName",
            key: "campaignName",
            maxWidth: "30ch",
          },
          {
            title: t("Type"),
            dataIndex: "type",
            key: "type",
            maxWidth: "30ch",
          },
          {
            title: t("Start Date"),
            dataIndex: "startDate",
            key: "startDate",
            isSortable: true,
            onSort: (sorting: "ASC" | "DESC") => {
              order.set(sorting);
              orderBy.set("startDate");
            },
            maxWidth: "10ch",
          },
          {
            title: t("End Date"),
            dataIndex: "endDate",
            key: "endDate",
            isSortable: true,
            onSort: (sorting: "ASC" | "DESC") => {
              order.set(sorting);
              orderBy.set("endDate");
            },
            maxWidth: "10ch",
          },
          {
            title: t("Action"),
            dataIndex: "actions",
            key: "actions",
            align: "center",
            maxWidth: "10ch",
          },
        ]}
      />
      {totalEntries > limit ? (
        <Pagination
          onPageChange={page.set}
          current={page.current}
          maxPages={Math.ceil(totalEntries / limit)}
        />
      ) : null}
    </>
  );
};

export default AvailableCampaignsTable;
