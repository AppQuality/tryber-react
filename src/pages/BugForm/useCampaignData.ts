import { useParams } from "react-router-dom";
import { useGetUsersMeCampaignsByCampaignIdQuery } from "src/services/tryberApi";

export default () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isFetching } = useGetUsersMeCampaignsByCampaignIdQuery({
    campaignId: id,
  });
  return { data, isError: error || !data, isFetching };
};
