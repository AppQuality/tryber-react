import { Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetUsersMeCampaignsByCampaignIdPreviewQuery } from "src/services/tryberApi";
import localizedUrl from "src/utils/localizedUrl";
import { SelectionForm } from "../../PreviewSelectionForm/SelectionForm/SelectionForm";
import AlreadyApplied from "./AlreadyApplied";
import AlreadySelected from "./AlreadySelected";
import CapReached from "./CapReached";
import SubscriptionClosed from "./SubscriptionClosed";

const isFuture = (iso: string) => {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return false;
  return t > Date.now();
};

const SelectBox = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!data) {
    return <div>Loading...</div>;
  }
  if (data.status === "selected")
    return (
      <AlreadySelected manualRoute={localizedUrl(`/campaigns/${id}/manual/`)} />
    );

  if (data.status === "applied" || data.status === "excluded")
    return <AlreadyApplied />;

  if (!isFuture(data.startDate)) return <SubscriptionClosed />;

  if (data.cap && data.cap.free <= 0) return <CapReached />;

  if (data.status === "available")
    return (
      <>
        <Title size="l" className="aq-mb-2">
          Ready to start?
        </Title>
        <SelectionForm />
      </>
    );

  return (
    <>
      {t(
        "There was an error in this campaign. Please contact us at support@tryber.me."
      )}
    </>
  );
};

export default SelectBox;
