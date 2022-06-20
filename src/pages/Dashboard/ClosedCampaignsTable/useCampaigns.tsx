import { useGetUsersMeCampaignsQuery } from "src/services/tryberApi";
import dateFormatter from "src/utils/dateFormatter";
const useCampaigns = ({ page, order, orderBy }: CampaignsTableProps) => {
  const limit = 10;
  const { data, isFetching } = useGetUsersMeCampaignsQuery({
    start: (page - 1) * limit,
    limit: limit,
    filterBy: {
      accepted: "1",
      statusId: "2",
    },
    order: order,
    orderBy: orderBy,
  });

  const campaigns = data?.results?.map((cp) => {
    return {
      key: cp.id ? cp.id : 123,
      campaigns: `${cp.id ? `[CP${cp.id}] - ` : ""}${cp.name}`,
      closeDate: dateFormatter(cp.dates.close),
    };
  });
  return { data, campaigns, isLoading: isFetching };
};

export default useCampaigns;
