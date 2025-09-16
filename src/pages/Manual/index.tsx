import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import {
  useGetUsersMeCampaignsByCampaignIdPreviewQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
} from "src/services/tryberApi";
import PermissionHandler from "./PermissionHandler";

const Manual = () => {
  const { id } = useParams<{ id: string }>();
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery(
    { campaignId: id },
    { skip: !id }
  );
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!data || !campaign) {
    return <div>Loading...</div>;
  }

  return (
    <PageTemplate
      title={campaign.title}
      heading={`CP${campaign.id} - ${campaign.campaign_type.name}`}
      route={`campaigns/${id}/manual`}
      shouldBeLoggedIn
    >
      <PermissionHandler id={id!} />
    </PageTemplate>
  );
};

export default Manual;
