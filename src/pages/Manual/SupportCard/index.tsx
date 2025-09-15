import { Button, Card } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useGetUsersMeCampaignsByCampaignIdPreviewQuery } from "src/services/tryberApi";

const SupportCard = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      title={t("__MANUAL_SUPPORT_CARD_TITLE", "Need help?")}
      className="aq-mb-4"
    >
      <a
        href={`mailto:${data.tl?.email}?subject=[CP-10146][T11205] Support Request`}
      >
        <Button flat size="block">
          {t("__MANUAL_SUPPORT_CARD_BUTTON", "Contact the TRYBER TEAM")}
        </Button>
      </a>
    </Card>
  );
};

export { SupportCard };
