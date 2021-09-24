import { useState } from "react";
import {
  Container,
  BSGrid,
  BSCol,
  Card,
  PageTitle,
  Tabs,
  Tab,
  Text,
  Button,
} from "@appquality/appquality-design-system";
import TesterSidebar from "../features/TesterSidebar";
import ActiveCampaignsTable from "../features/dashboard/ActiveCampaignsTable";
import CompletedCampaignsTable from "../features/dashboard/CompletedCampaignsTable";
import ClosedCampaignsTable from "../features/dashboard/ClosedCampaignsTable";
import AvailableCampaignsTable from "../features/dashboard/AvailableCampaignsTable";
import PerformanceData from "../features/dashboard/PerformanceData";
import PopupContainer from "../features/dashboard/PopupContainer";
import ComingSoonHelpModal from "../features/dashboard/ComingSoonHelpModal";
import OnboardingModal from "../features/dashboard/OnboardingModal";
import { useTranslation } from "react-i18next";
import useUser from "../redux/user";

import GoogleTagManager from "../features/GoogleTagManager";
import LoggedOnly from "../features/LoggedOnly";

export default function Dashboard() {
  //constants - START
  const { user } = useUser();
  const onboardingComplete = user && user.onboarding_completed;
  const [isPopupModalOpen, setIsPopupModalOpen] = useState(true);
  const [isPopupArchiveModalOpen, setIsPopupArchiveModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(true);

  const { t } = useTranslation();

  return (
    <GoogleTagManager title={t("Dashboard")}>
      <LoggedOnly>
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
        <TesterSidebar route={"my-dashboard"}>
          <Container className="aq-pb-3">
            <PageTitle
              as="h2"
              size="regular"
              subtitle={t(
                "This is your personal dashboard. From here you can check out your stats, keep an eye on the progress of your work and find new campaigns to apply for. Have fun!"
              )}
            >
              {t("Dashboard")}
            </PageTitle>
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
                    <Card shadow={true}>
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
          </Container>
        </TesterSidebar>
      </LoggedOnly>
    </GoogleTagManager>
  );
}
