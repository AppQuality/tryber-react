import React, { useEffect, useState } from "react";
import {
  Container,
  BSGrid,
  BSCol,
  Card,
  PageTitle,
  Tabs,
  Tab,
  Text,
  SpinnerWrapper,
  Spinner,
  Title,
} from "@appquality/appquality-design-system";
import TesterSidebar from "../features/TesterSidebar";
import { Helmet } from "react-helmet";
import ActiveCampaignsTable from "../features/dashboard/ActiveCampaignsTable";
import CompletedCampaignsTable from "../features/dashboard/CompletedCampaignsTable";
import ClosedCampaignsTable from "../features/dashboard/ClosedCampaignsTable";
import AvailableCampaignsTable from "../features/dashboard/AvailableCampaignsTable";
import PerformanceData from "../features/dashboard/PerformanceData";
import { useTranslation } from "react-i18next";
import { useUser } from "../store/useUser";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: 0,
    tester_id: 0,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

export default function Dashboard({ isMenuOpen }: { isMenuOpen: boolean }) {
  //constants - START

  const { user, error } = useUser();
  const [isLoading, setisLoading] = useState(true);

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

  useEffect(() => {
    if (user) {
      tagManagerArgs.dataLayer = {
        role: user.role,
        wp_user_id: user.wp_user_id,
        tester_id: user.id,
        is_admin_page: false,
      };

      setisLoading(false);
    } else {
      if (error) {
        if (error.statusCode === 403) {
          window.location.href = "/";
        } else {
          alert(error.message);
        }
      }
    }
  }, [user, error]);

  if (isLoading) {
    return (
      <>
        {helmet()}
        <Container className="aq-py-3">
          <SpinnerWrapper>
            <Spinner />
            <Title size="xs" as="h5">
              {t("loading")}
            </Title>
          </SpinnerWrapper>
        </Container>
      </>
    );
  }
  return (
    <>
      {helmet()}
      <TesterSidebar route={"my-dashboard"} openFromHeader={isMenuOpen}>
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
              </div>
            </BSCol>
          </BSGrid>
        </Container>
      </TesterSidebar>
    </>
  );
}
