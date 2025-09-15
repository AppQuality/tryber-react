import { Button } from "@appquality/appquality-design-system";
import { Link, useParams } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useGetUsersMeCampaignsByCampaignIdQuery } from "src/services/tryberApi";

const BugFormButton = () => {
  const { id } = useParams<{ id: string }>();
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery(
    { campaignId: id },
    { skip: !id }
  );
  const localizedBugFormUrl = useLocalizeRoute(
    `campaign/${Number(id)}/bugform/`
  );

  if (!campaign) {
    return <div>Loading...</div>;
  }

  if (!campaign.hasBugForm) {
    return null;
  }
  return (
    <Link to={localizedBugFormUrl}>
      <Button size="block" kind="secondary">
        Report a Bug
      </Button>
    </Link>
  );
};

export default BugFormButton;
