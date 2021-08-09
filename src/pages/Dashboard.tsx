import {
  Container,
  BSGrid,
  BSCol,
  Card,
  PageTitle,
  Tabs,
  Tab,
  Text,
} from "@appquality/appquality-design-system";
import TesterSidebar from "../features/TesterSidebar";
import { Helmet } from "react-helmet";
import ActiveCampaignsTable from "../features/dashboard/ActiveCampaignsTable";
import CompletedCampaignsTable from "../features/dashboard/CompletedCampaignsTable";
import ClosedCampaignsTable from "../features/dashboard/ClosedCampaignsTable";
import AvailableCampaignsTable from "../features/dashboard/AvailableCampaignsTable";
import PerformanceData from "../features/dashboard/PerformanceData";
import PopupCard from "../features/dashboard/PopupCard";
import PopupContainer from "../features/dashboard/PopupContainer";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Dashboard({ isMenuOpen }: { isMenuOpen: boolean }) {
  //constants - START
  const [isPopupModalOpen, setIsPopupModalOpen] = useState(true);
  const { t } = useTranslation();
  const helmet = () => {
    return (
      <Helmet>
        <title>{t("Dashboard")} - AppQuality Crowd</title>
        <meta property="og:title" content={t("Dashboard")} />
        <meta name="description" content={t("Dashboard")} />
      </Helmet>
    );
  };
  //constants - END

  return (
    <>
      {helmet()}
      <TesterSidebar route={"my-dashboard"} openFromHeader={isMenuOpen}>
        <PopupContainer
          open={isPopupModalOpen}
          onClose={() => setIsPopupModalOpen(false)}
        />
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
                  <Tab id="active" title={t("Running")}>
                    <div className="aq-m-3">
                      <Text>
                        {t(
                          `A list of all the campaigns you successfully applied for. Read the manual and report as many bugs as you can to earn experience points and earn money. Don't forget to apply for new campaigns!`
                        )}
                      </Text>
                      <ActiveCampaignsTable />
                    </div>
                  </Tab>
                  <Tab id="completed" title={t("Completed")}>
                    <div className="aq-m-3">
                      <Text>
                        {t(
                          `A list of all the campaigns you participated in that are now completed. We will evaluate your performance in the 14 days following the end of the campaign and award you experience points and money accordingly.`
                        )}
                      </Text>
                      <CompletedCampaignsTable />
                    </div>
                  </Tab>
                  <Tab id="closed" title={t("Closed")}>
                    <div className="aq-m-3">
                      <Text>
                        {t(
                          `A list of the campaigns you participated in that were successfully evaluated by us. Campaigns will remain on this list until you collect your booty, to make sure you never miss your well-deserved payout.`
                        )}
                      </Text>
                      <ClosedCampaignsTable />
                    </div>
                  </Tab>
                </Tabs>
              </Card>
              <Card className="aq-mb-3" title={t("Avalaible Campaigns")}>
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
                <PopupCard />
              </div>
            </BSCol>
          </BSGrid>
        </Container>
      </TesterSidebar>
    </>
  );
}
