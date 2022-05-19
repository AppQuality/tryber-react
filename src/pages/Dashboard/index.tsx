import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Tab,
  Tabs,
  Text,
} from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { OutsideContainer, PageTemplate } from "src/features/PageTemplate";
import useUser from "src/redux/user";
import { fetchRankingSummary } from "../../redux/ranking/actionCreator";

import ActiveCampaignsTable from "./ActiveCampaignsTable";
import AvailableCampaignsTable from "./AvailableCampaignsTable";
import ClosedCampaignsTable from "./ClosedCampaignsTable";
import ComingSoonHelpModal from "./ComingSoonHelpModal";
import CompletedCampaignsTable from "./CompletedCampaignsTable";
import { FeedbackButton, FeedbackModal } from "./FeedbackModal";
import OnboardingModal from "./OnboardingModal";
import PerformanceData from "./PerformanceData";
import PopupContainer from "./PopupContainer";

export default function Dashboard() {
  const { user } = useUser();
  const onboardingComplete = user && user.onboarding_completed;
  const [isPopupModalOpen, setIsPopupModalOpen] = useState(true);
  const [isPopupArchiveModalOpen, setIsPopupArchiveModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(true);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRankingSummary());
  }, []);

  return (
    <PageTemplate
      title={t("Dashboard")}
      route="my-dashboard"
      subtitle={t(
        "This is your personal dashboard. From here you can check out your stats, keep an eye on the progress of your work and find new campaigns to apply for. Have fun!"
      )}
      shouldBeLoggedIn
    >
      <OutsideContainer>
        <ComingSoonHelpModal />
        {onboardingComplete ? null : (
          <OnboardingModal
            open={isOnboardingModalOpen}
            onClose={() => setIsOnboardingModalOpen(false)}
          />
        )}
        {onboardingComplete ? (
          <PopupContainer
            open={isPopupModalOpen}
            onClose={() => setIsPopupModalOpen(false)}
          />
        ) : null}
        {onboardingComplete ? (
          <PopupContainer
            onClose={() => setIsPopupArchiveModalOpen(false)}
            open={isPopupArchiveModalOpen}
            showExpired={true}
          />
        ) : null}
        {onboardingComplete ? (
          <>
            <FeedbackModal
              onClose={() => setFeedbackModalOpen(false)}
              open={isFeedbackModalOpen}
              user={user}
            />
            <FeedbackButton handleClick={() => setFeedbackModalOpen(true)} />
          </>
        ) : null}
      </OutsideContainer>
      <BSGrid>
        <BSCol size="col-lg-9 ">
          <Card className="aq-mb-3" bodyClass="">
            <Tabs active="active">
              <Tab id="active" title={t("Active")}>
                <div className="aq-m-3">
                  <Text className="aq-mb-3">
                    {t(
                      `A list of all the campaigns you have been successfully selected for. Read the manual and complete all the requested tasks before the end date to receive your reward.`
                    )}
                  </Text>
                  <ActiveCampaignsTable />
                </div>
              </Tab>
              <Tab id="completed" title={t("Finished")}>
                <div className="aq-m-3">
                  <Text className="aq-mb-3">
                    {t(
                      `A list of all the campaigns you participated in that are now finished. We will evaluate your performance in the days following the end date and reward you accordingly.`
                    )}
                  </Text>
                  <CompletedCampaignsTable />
                </div>
              </Tab>
              <Tab id="closed" title={t("Closed")}>
                <div className="aq-m-3">
                  <Text className="aq-mb-3">
                    {t(
                      `A list of all the campaigns you participated in that we successfully evaluated and that are now closed.`
                    )}
                  </Text>
                  <ClosedCampaignsTable />
                </div>
              </Tab>
            </Tabs>
          </Card>
          <Card className="aq-mb-3" title={t("Avalaible Campaigns")}>
            <Text className="aq-mb-3">
              {t(
                `A list of the campaigns that are currently available on the platform. Check the details and apply!`
              )}
            </Text>
            <AvailableCampaignsTable />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <div className="stick-to-header-lg ">
            <Card
              className="aq-mb-3"
              title={t("Your Performance")}
              shadow={true}
            >
              <PerformanceData />
            </Card>
            {onboardingComplete ? (
              <Card shadow={true} className="aq-mb-3">
                <Button
                  flat
                  type="info"
                  size="block"
                  onClick={() =>
                    setIsPopupArchiveModalOpen(!isPopupArchiveModalOpen)
                  }
                >
                  {t("Inbox")}
                </Button>
              </Card>
            ) : null}
          </div>
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
