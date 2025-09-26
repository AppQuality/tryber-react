import { Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { useGetUsersMeCampaignsByCampaignIdQuery } from "src/services/tryberApi";

const useLocalizedBugParadeUrl = (campaignId: string) => {
  const { i18n } = useTranslation();
  const prefix = i18n.language === "en" ? "" : `/${i18n.language}`;
  return `${prefix}/bugs/?controller=bugs&action=byCampaign&id=${campaignId}`;
};

const BugFormLink = ({
  children,
  campaignId,
}: {
  children: React.ReactNode;
  campaignId: string;
}) => {
  const { id } = useParams<{ id: string }>();
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery({
    campaignId: campaignId,
  });
  const localizedBugFormUrl = useLocalizeRoute(
    `campaign/${Number(id)}/bugform/`
  );
  const localizedBugParadeUrl = useLocalizedBugParadeUrl(id);

  if (!campaign) {
    return <div>Loading...</div>;
  }

  if (campaign.hasBugParade !== 1) {
    return <Link to={localizedBugFormUrl}>{children}</Link>;
  }

  return (
    <a href={localizedBugParadeUrl}>
      <Button size="block" kind="secondary">
        Report a Bug
      </Button>
    </a>
  );
};

const BugFormButton = () => {
  const { id } = useParams<{ id: string }>();
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery(
    { campaignId: id },
    { skip: !id }
  );

  if (!campaign) {
    return <div>Loading...</div>;
  }

  if (!campaign.hasBugForm) {
    return null;
  }
  return (
    <BugFormLink campaignId={id!}>
      <Button size="block" kind="secondary">
        Report a Bug
      </Button>
    </BugFormLink>
  );
};

export default BugFormButton;
