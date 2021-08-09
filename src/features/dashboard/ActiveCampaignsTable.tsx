import { Pagination, Table } from "@appquality/appquality-design-system";
import useActiveCampaigns from "../../store/dashboard/useActiveCampaigns";
import { useTranslation } from "react-i18next";

const ActiveCampaignsTable = () => {
  const { t } = useTranslation();
  const { campaigns, page, totalEntries, limit, loading, order, orderBy } =
    useActiveCampaigns();

  return (
    <>
      <Table
        dataSource={campaigns}
        isLoading={loading}
        isStriped={true}
        order={order.current}
        orderBy={orderBy.current}
        columns={[
          {
            title: t("Campaign"),
            dataIndex: "campaigns",
            key: "campaigns",
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
          },
          {
            title: t("Actions"),
            dataIndex: "actions",
            key: "actions",
            align: "center",
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

export default ActiveCampaignsTable;
