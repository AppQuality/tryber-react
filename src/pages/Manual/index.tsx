import {
  BSCol,
  BSGrid,
  Tab,
  Tabs,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import {
  useGetUsersMeCampaignsByCampaignIdPreviewQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
} from "src/services/tryberApi";
import { BugCard } from "./BugCard";
import { CampaignCard } from "./CampaignCard";
import { PayoutRecap } from "./PayoutRecap";
import { SupportCard } from "./SupportCard";

const Manual = () => {
  const { t } = useTranslation();
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
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <Tabs active="manual-testing-instructions">
            <Tab
              id="manual-testing-instructions"
              title={t("__MANUAL_TAB_TITLE_INFO", "Info")}
            >
              <div className="aq-py-4">
                <Text className="aq-mb-2">{campaign.goal}</Text>
                <PayoutRecap id={id} />
              </div>
            </Tab>
            <Tab id="usecase" title={t("__MANUAL_TAB_TITLE_USECASE", "Manual")}>
              <div className="aq-py-4">use case content</div>
            </Tab>
          </Tabs>
        </BSCol>
        <BSCol size="col-lg-3 aq-order-0 aq-order-1-lg ">
          <SupportCard id={id!} />
          <CampaignCard id={id!} />
          <BugCard id={id!} />
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
};

export default Manual;
