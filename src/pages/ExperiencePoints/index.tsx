import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { PageTemplate } from "src/features/PageTemplate";
import ExperiencePointsFilters from "./ExperiencePointsFilters";
import ExperiencePointsTable from "./ExperiencePointsTable";

export default function ExperiencePoints() {
  const { t } = useTranslation();
  return (
    <PageTemplate
      title={t("Experience Points")}
      route={"experience-points"}
      shouldBeLoggedIn
    >
      <BSGrid>
        <BSCol size="col-lg-9 ">
          <Card className="aq-mb-3" title={t("History")}>
            <ExperiencePointsTable />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <div className="stick-to-header-lg ">
            <Card className="aq-mb-3" title={t("Filters")} shadow={true}>
              <ExperiencePointsFilters />
            </Card>
            <Card shadow={true}>
              <div className="aq-mb-2 aq-text-info">
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
                kind="info"
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
