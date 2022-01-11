import { Pagination, Table } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import useClosedCampaigns from "./effects/useClosedCampaigns";

const ClosedCampaignsTable = () => {
  const { t } = useTranslation();
  const { campaigns, page, totalEntries, limit, loading, order, orderBy } =
    useClosedCampaigns();
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
            "No campaign has been completed yet. It's time to get to work: finish the active ones or apply in the available campaigns!"
          ),
        }}
        columns={[
          {
            title: t("Campaign"),
            dataIndex: "campaigns",
            key: "campaigns",
            width: "70ch",
          },
          {
            title: t("Close Date"),
            dataIndex: "closeDate",
            key: "closeDate",
            isSortable: true,
            onSort: (sorting: "ASC" | "DESC") => {
              order.set(sorting);
              orderBy.set("closeDate");
            },
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

export default ClosedCampaignsTable;
