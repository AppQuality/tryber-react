import {
  BSCol,
  BSGrid,
  Card,
  Container,
  PageTitle,
} from "@appquality/appquality-design-system";
import queryString from "query-string";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import GoogleTagManager from "src/features/GoogleTagManager";
import LoggedOnly from "src/features/LoggedOnly";
import TesterSidebar from "src/features/TesterSidebar";
import { useMyBugs } from "./effects/useMyBugs";
import MyBugsFilters from "./MyBugsFilters";
import MyBugsTable from "./MyBugsTable";

export default function MyBugs() {
  const { search } = useLocation();
  const { t } = useTranslation();
  const {
    data,
    page,
    totalBugs,
    limit,
    campaigns,
    severities,
    status,
    loading,
    order,
    orderBy,
  } = useMyBugs();

  useEffect(() => {
    const values = queryString.parse(search);
    if (values.cp) {
      campaigns.setSelected({ value: values.cp.toString(), label: "" });
    }
    if (values.status) {
      status.setSelected({ value: values.status.toString(), label: "" });
    }
  }, [queryString]);

  return (
    <GoogleTagManager title={t("Uploaded Bugs")}>
      <LoggedOnly>
        <TesterSidebar route={"my-bugs"}>
          <Container className="aq-pb-3">
            <PageTitle size="regular" as="h2" className="aq-mb-3">
              {t("Uploaded Bugs")}
            </PageTitle>
            <BSGrid>
              <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
                <Card className="aq-mb-3" title={t("Submitted bugs")}>
                  <MyBugsTable
                    data={data.current}
                    page={page.current}
                    setPage={page.set}
                    totalBugs={totalBugs}
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
                  <MyBugsFilters
                    campaigns={campaigns}
                    severities={severities}
                    status={status}
                  />
                </Card>
              </BSCol>
            </BSGrid>
          </Container>
        </TesterSidebar>
      </LoggedOnly>
    </GoogleTagManager>
  );
}
