import { Table, Pagination } from "@appquality/appquality-design-system";
import useAvailableCampaigns from "../../store/dashboard/useAvailableCampaigns";

const AvailableCampaignsTable = () => {
  const { campaigns, page, totalEntries, limit, loading } =
    useAvailableCampaigns();

  return (
    <>
      <Table
        dataSource={campaigns}
        isLoading={loading}
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
          },
          {
            title: "End Date",
            dataIndex: "endDate",
            key: "endDate",
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
