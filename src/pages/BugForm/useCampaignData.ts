import { useParams } from "react-router-dom";
import {
  useGetUsersMeCampaignsByCampaignIdDevicesQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
} from "src/services/tryberApi";

export default () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isFetching } = useGetUsersMeCampaignsByCampaignIdQuery({
    campaignId: id,
  });
  const device = useGetUsersMeCampaignsByCampaignIdDevicesQuery({
    campaignId: id,
  });

  return {
    data,
    device: device.data,
    isError: error || !data,
    noDevice: device.error,
    isFetching: isFetching || device.isFetching,
    campaignId: id,
  };
};
