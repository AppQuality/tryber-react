import { Pagination, Table } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import useActiveCampaigns from "./effects/useActiveCampaigns";

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
          empty: t(
            "You are not currently selected for any campaigns. Apply in available campaigns to participate in upcoming ones!"
          ),
        }}
        columns={[
          {
            title: t("Campaign"),
            dataIndex: "campaigns",
            key: "campaigns",
            maxWidth: "50ch",
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
            maxWidth: "12ch",
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
            maxWidth: "13ch",
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
