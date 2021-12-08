import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { PageTemplate } from "src/features/PageTemplate";
import { useExperiencePoints } from "src/pages/ExperiencePoints/effects/useExperiencePoints";
import ExperiencePointsFilters from "./ExperiencePointsFilters";
import ExperiencePointsTable from "./ExperiencePointsTable";

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
    <PageTemplate
      title={t("Experience Points")}
      route={"experience-points"}
      shouldBeLoggedIn
    >
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
                forwardedAs="a"
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
    </PageTemplate>
  );
}
