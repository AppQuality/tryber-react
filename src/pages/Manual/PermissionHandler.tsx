import { useTranslation } from "react-i18next";
import { useGetUsersMeCampaignsByCampaignIdPreviewQuery } from "src/services/tryberApi";
import AcceptContract from "./AcceptContract";
import ManualContent from "./ManualContent";

const PermissionHandler = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const selectionStatus = data?.selectionStatus;

  if (!selectionStatus || selectionStatus === "excluded") {
    return (
      <div>{t("You do not have permission to access this campaign.")}</div>
    );
  }

  if (selectionStatus === "starting") {
    return <AcceptContract id={id} />;
  }

  return <ManualContent id={id!} />;
};

export default PermissionHandler;
