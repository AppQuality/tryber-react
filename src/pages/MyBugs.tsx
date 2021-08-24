import { useEffect } from "react";
import {
  Container,
  BSGrid,
  BSCol,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import TesterSidebar from "../features/TesterSidebar";
import MyBugsTable from "../features/my-bugs/MyBugsTable";
import MyBugsFilters from "../features/my-bugs/MyBugsFilters";
import { useMyBugs } from "../store/useMyBugs";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import GoogleTagManager from "../features/GoogleTagManager";
import LoggedOnly from "../features/LoggedOnly";

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
