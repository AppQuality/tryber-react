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
        i18n={{
          loading: t("Loading Data"),
          empty: t("There are no Campaigns here"),
        }}
        columns={[
          {
            title: t("Campaign"),
            dataIndex: "campaigns",
            key: "campaigns",
            width: "40ch",
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
            align: "center",
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
            align: "center",
          },
          {
            title: t("Manual"),
            dataIndex: "manual",
            key: "manual",
            align: "center",
            width: "10ch",
          },
          {
            title: t("Bugform"),
            dataIndex: "bugform",
            key: "bugform",
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

export default ActiveCampaignsTable;
