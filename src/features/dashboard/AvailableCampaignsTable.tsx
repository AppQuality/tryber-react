import { Table, Pagination } from "@appquality/appquality-design-system";
import useAvailableCampaigns from "../../store/dashboard/useAvailableCampaigns";
import { useTranslation } from "react-i18next";

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
            width: "30ch",
          },
          {
            title: t("Type"),
            dataIndex: "type",
            key: "type",
            width: "30ch",
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
            width: "10ch",
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
            width: "10ch",
          },
          {
            title: t("Action"),
            dataIndex: "actions",
            key: "actions",
            align: "center",
            width: "10ch",
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
