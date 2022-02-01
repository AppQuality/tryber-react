import { Pagination, Table } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import useCompletedCampaigns from "./effects/useCompletedCampaigns";

const CompletedCampaignsTable = () => {
  const { t } = useTranslation();
  const { campaigns, page, totalEntries, limit, loading, order, orderBy } =
    useCompletedCampaigns();
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
            "There are currently no completed campaigns. You can relax, finish the active ones or apply in the new available campaigns!"
          ),
        }}
        columns={[
          {
            title: t("Campaign"),
            dataIndex: "campaigns",
            key: "campaigns",
            maxWidth: "60ch",
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
            maxWidth: "16ch",
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

export default CompletedCampaignsTable;
