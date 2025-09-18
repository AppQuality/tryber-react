import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import {
  useGetUsersMeCampaignsByCampaignIdPreviewQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
} from "src/services/tryberApi";
import { NoAccess } from "./NoAccess";
import PermissionHandler from "./PermissionHandler";

const Manual = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { data: campaign, isLoading: isLoadingCampaign } =
    useGetUsersMeCampaignsByCampaignIdQuery({ campaignId: id }, { skip: !id });
  const { data, isLoading } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (isLoading || isLoadingCampaign) {
    return <div>Loading...</div>;
  }

  const selectionStatus = data?.selectionStatus;

  if (!selectionStatus || selectionStatus === "excluded") {
    return <NoAccess />;
  }

  return (
    <PageTemplate
      title={campaign?.title}
      heading={`CP${campaign?.id} - ${campaign?.campaign_type?.name}`}
      route={`campaigns/${id}/manual`}
      shouldBeLoggedIn
    >
      <PermissionHandler id={id!} />
    </PageTemplate>
  );
};

export default Manual;
