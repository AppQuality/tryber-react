import {
  BSCol,
  BSGrid,
  Card,
  Tab,
  Tabs,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import {
  useGetUsersMeCampaignsByCampaignIdPreviewQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
  useGetUsersMeCampaignsByCampaignIdTasksQuery,
} from "src/services/tryberApi";
import { BugCard } from "./BugCard";
import { CampaignCard } from "./CampaignCard";
import { DeviceCard } from "./DeviceCard";
import { PayoutRecap } from "./PayoutRecap";
import { SupportCard } from "./SupportCard";
import { UseCases } from "./UseCases";

const ManualContent = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery({
    campaignId: id,
  });
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  const { data: tasks } = useGetUsersMeCampaignsByCampaignIdTasksQuery(
    { campaignId: id },
    { skip: !id }
  );
  if (!data || !campaign) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <Card className="aq-mb-0" bodyClass="">
            <div className="aq-mb-4">
              <Tabs active="usecase">
                <Tab
                  id="manual-testing-instructions"
                  title={t("__MANUAL_TAB_TITLE_INFO", "Info")}
                >
                  <div className="aq-p-4">
                    <PayoutRecap id={id} />
                  </div>
                </Tab>
                {tasks && tasks.length > 0 && (
                  <Tab
                    id="usecase"
                    title={t("__MANUAL_TAB_TITLE_USECASE", "Manual")}
                  >
                    <div className="aq-p-4">
                      <UseCases id={id!} />
                    </div>
                  </Tab>
                )}
              </Tabs>
            </div>
          </Card>
        </BSCol>
        <BSCol size="col-lg-3 aq-order-0 aq-order-1-lg ">
          <SupportCard id={id!} />
          <CampaignCard id={id!} />
          <DeviceCard id={id!} />
          <BugCard id={id!} />
        </BSCol>
      </BSGrid>
    </>
  );
};

export default ManualContent;
