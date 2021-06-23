import { useEffect, useState } from "react";
import {
  Container,
  BSGrid,
  BSCol,
  Card,
  SmallTitle,
  Spinner,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import TesterSidebar from "../features/TesterSidebar";
import ExperiencePointsTable from "../features/experience-points/ExperiencePointsTable";
import ExperiencePointsFilters from "../features/experience-points/ExperiencePointsFilters";
import { useExperiencePoints } from "../store/useExperiencePoints";
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

export default function ExperiencePoints({
  isMenuOpen,
}: {
  isMenuOpen: boolean;
}) {
  const { user, error } = useUser();
  const [isLoading, setisLoading] = useState(true);

  const { t } = useTranslation();
  const {
    data,
    page,
    totalEntries,
    limit,
    search,
    campaigns,
    activities,
    dates,
    loading,
    order,
    orderBy,
  } = useExperiencePoints();

  const helmet = () => {
    return (
      <Helmet>
        <title>{t("Experience Points")} - AppQuality Crowd</title>
        <meta property="og:title" content={t("Experience Points")} />
        <meta name="description" content={t("Experience Points")} />
      </Helmet>
    );
  };

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
            <SmallTitle as="h5">{t("loading")}</SmallTitle>
          </SpinnerWrapper>
        </Container>
      </>
    );
  }
  return (
    <>
      {helmet()}
      <TesterSidebar route={"experience-points"} openFromHeader={isMenuOpen}>
        <Container className="aq-py-3">
          <h2 className="aq-mb-3">{t("Experience Points")}</h2>
          <BSGrid>
            <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
              <Card className="aq-mb-3" title={t("History")}>
                <ExperiencePointsTable
                  data={data.current}
                  page={page.current}
                  setPage={page.set}
                  totalEntries={totalEntries}
                  limit={limit.current}
                  loading={loading}
                  order={order}
                  orderBy={orderBy}
                />
              </Card>
            </BSCol>
            <BSCol size="col-lg-3">
              <Card
                className="stick-to-header-lg aq-mb-3"
                title={t("Filters")}
                shadow={true}
              >
                <ExperiencePointsFilters
                  search={search}
                  campaigns={campaigns}
                  activities={activities}
                  dates={dates}
                />
              </Card>
            </BSCol>
          </BSGrid>
        </Container>
      </TesterSidebar>
    </>
  );
}
