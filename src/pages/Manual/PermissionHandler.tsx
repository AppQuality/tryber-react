import { useGetUsersMeCampaignsByCampaignIdPreviewQuery } from "src/services/tryberApi";
import AcceptContract from "./AcceptContract";
import ManualContent from "./ManualContent";

const PermissionHandler = ({ id }: { id: string }) => {
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  const selectionStatus = data.selectionStatus;

  if (!selectionStatus) {
    return <div>You do not have permission to access this campaign.</div>;
  }

  if (true || selectionStatus === "starting") {
    return <AcceptContract id={id} />;
  }

  return <ManualContent id={id!} />;
};

export default PermissionHandler;
