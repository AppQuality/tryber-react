import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { useGetUsersMeCampaignsByCampaignIdPreviewQuery } from "src/services/tryberApi";
import { NoAccess } from "./NoAccess";
import PermissionHandler from "./PermissionHandler";

const Manual = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetUsersMeCampaignsByCampaignIdPreviewQuery({
    campaignId: id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const selectionStatus = data?.selectionStatus;

  if (!selectionStatus || selectionStatus === "excluded") {
    return <NoAccess />;
  }

  return (
    <PageTemplate
      title={data.title}
      heading={`CP${id} - ${data.type.name}`}
      route={`campaigns/${id}/manual/`}
      shouldBeLoggedIn
    >
      <PermissionHandler id={id!} />
    </PageTemplate>
  );
};

export default Manual;
