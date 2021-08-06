import { Table, Pagination } from "@appquality/appquality-design-system";
import useAvailableCampaigns from "../../store/dashboard/useAvailableCampaigns";

const AvailableCampaignsTable = () => {
  const { campaigns, page, totalEntries, limit, loading, order, orderBy } =
    useAvailableCampaigns();

  return (
    <>
      <Table
        dataSource={campaigns}
        isLoading={loading}
        order={order.current}
        orderBy={orderBy.current}
        columns={[
          {
            title: "Campaign",
            dataIndex: "campaignName",
            key: "campaignName",
          },
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
          },
          {
            title: "Start Date",
            dataIndex: "startDate",
            key: "startDate",
            isSortable: true,
            onSort: (sorting: "ASC" | "DESC") => {
              order.set(sorting);
              orderBy.set("startDate");
            },
          },
          {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
            isSortable: true,
            onSort: (sorting: "ASC" | "DESC") => {
              order.set(sorting);
              orderBy.set("endDate");
            },
          },
          {
            title: "Actions",
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

export default AvailableCampaignsTable;
