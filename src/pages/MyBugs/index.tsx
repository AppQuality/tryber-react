import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { PageTemplate } from "src/features/PageTemplate";
import MyBugsFilters from "./MyBugsFilters";
import MyBugsTable from "./MyBugsTable";
import { useQueryStringFilters } from "./useQueryStringFilters";

export default function MyBugs() {
  const { t } = useTranslation();
  useQueryStringFilters();

  return (
    <PageTemplate title={t("Uploaded Bugs")} route={"my-bugs"} shouldBeLoggedIn>
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <Card className="aq-mb-3" title={t("Submitted bugs")}>
            <MyBugsTable />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <Card
            className="stick-to-header-lg aq-mb-3"
            title={t("Filters")}
            shadow={true}
          >
            <MyBugsFilters />
          </Card>
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
