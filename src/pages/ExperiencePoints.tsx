import {
  Container,
  BSGrid,
  BSCol,
  Card,
  Button,
  PageTitle,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import TesterSidebar from "../features/TesterSidebar";
import ExperiencePointsTable from "../features/experience-points/ExperiencePointsTable";
import ExperiencePointsFilters from "../features/experience-points/ExperiencePointsFilters";
import { useExperiencePoints } from "../store/useExperiencePoints";
import GoogleTagManager from "../features/GoogleTagManager";
import LoggedOnly from "../features/LoggedOnly";

export default function ExperiencePoints() {
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

  return (
    <GoogleTagManager title={t("Experience Points")}>
      <LoggedOnly>
        <TesterSidebar route={"experience-points"}>
          <Container className="aq-pb-3">
            <PageTitle as="h2" size="regular">
              {t("Experience Points")}
            </PageTitle>
            <BSGrid>
              <BSCol size="col-lg-9 ">
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
                <div className="stick-to-header-lg ">
                  <Card className="aq-mb-3" title={t("Filters")} shadow={true}>
                    <ExperiencePointsFilters
                      search={search}
                      campaigns={campaigns}
                      activities={activities}
                      dates={dates}
                    />
                  </Card>
                  <Card shadow={true}>
                    <div className="aq-mb-2">
                      <strong>{t("How do experience points work?")}</strong>
                    </div>
                    <Text className="aq-mb-3">
                      {t(
                        "Learn more about how we calculate and attribute experience points."
                      )}
                    </Text>
                    <Button
                      as="a"
                      href={`${t("/discover-experience-points/")}`}
                      type="primary"
                      size="block"
                      flat={true}
                    >
                      {t("Learn More")}
                    </Button>
                  </Card>
                </div>
              </BSCol>
            </BSGrid>
          </Container>
        </TesterSidebar>
      </LoggedOnly>
    </GoogleTagManager>
  );
}
