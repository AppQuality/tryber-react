import {
  BSCol,
  BSGrid,
  Button,
  Tab,
  Tabs,
  Text,
} from "@appquality/appquality-design-system";
import { prepareAutoBatched } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { start } from "repl";
import { PageTemplate } from "src/features/PageTemplate";
import {
  useGetUsersMeCampaignsByCampaignIdPreviewQuery,
  useGetUsersMeCampaignsByCampaignIdQuery,
  useGetUsersMeCampaignsByCampaignIdTasksQuery,
  useGetUsersMeQuery,
} from "src/services/tryberApi";
import { BugCard } from "./BugCard";
import { CampaignCard } from "./CampaignCard";
import { PayoutRecap } from "./PayoutRecap";
import { SupportCard } from "./SupportCard";
import { UseCases } from "./UseCases";

const Manual = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: user } = useGetUsersMeQuery({
    fields: "wp_user_id,role",
  });
  const { data: campaign } = useGetUsersMeCampaignsByCampaignIdQuery(
    { campaignId: id },
    { skip: !id }
  );
  const { data } = useGetUsersMeCampaignsByCampaignIdPreviewQuery(
    { campaignId: id },
    { skip: !id }
  );

  const { data: tasks } = useGetUsersMeCampaignsByCampaignIdTasksQuery(
    { campaignId: id },
    { skip: !id }
  );
  if (!data || !campaign || !user) {
    return <div>Loading...</div>;
  }

  const startActivity = async () => {
    return fetch(
      `${process.env.REACT_APP_CROWD_WP_URL}/wp-content/plugins/ultimate-aq-plugin/ajax_controllers/ajax-manual-actions.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "ajax_start_tester_activities",
          user_id: user.wp_user_id,
        }),
      }
    )
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          window.location.reload();
        }
        throw new Error("Error while starting the activity.");
      });
  };

  return (
    <PageTemplate
      title={campaign.title}
      heading={`CP${campaign.id} - ${campaign.campaign_type.name}`}
      route={`campaigns/${id}/manual`}
      shouldBeLoggedIn
    >
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <Tabs active="usecase">
            <Tab
              id="manual-testing-instructions"
              title={t("__MANUAL_TAB_TITLE_INFO", "Info")}
            >
              <div className="aq-py-4">
                <Text className="aq-mb-2">{campaign.goal}</Text>
                <PayoutRecap id={id} />
              </div>
            </Tab>
            {tasks && tasks.length > 0 && (
              <Tab
                id="usecase"
                title={t("__MANUAL_TAB_TITLE_USECASE", "Manual")}
              >
                <div className="aq-py-4">
                  <UseCases id={id!} />
                </div>
              </Tab>
            )}
          </Tabs>

          {(data.selectionStatus === "starting" ||
            user.role === "administrator") && (
            <Button
              onClick={(e: any) => {
                e.preventDefault();
                startActivity();
              }}
              className="aq-mb-3 capitalize-first"
              kind="primary"
              size="block"
            >
              Start testing
            </Button>
          )}
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
