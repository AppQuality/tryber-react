import { useEffect, useState } from "react";
import {
  Container,
  BSGrid,
  BSCol,
  Card,
  Title,
  Spinner,
  PageTitle,
  SpinnerWrapper,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import TesterSidebar from "../features/TesterSidebar";
import MyBugsTable from "../features/my-bugs/MyBugsTable";
import MyBugsFilters from "../features/my-bugs/MyBugsFilters";
import { useMyBugs } from "../store/useMyBugs";
import useUser from "../redux/user";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: 0,
    tester_id: 0,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

export default function MyBugs() {
  const { search } = useLocation();
  const { user, error, isLoading } = useUser();
  const isAdmin = user && user.isAdmin ? user.isAdmin : false;
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

  const helmet = () => {
    return (
      <Helmet>
        <title>{t("Uploaded Bugs")} - AppQuality Crowd</title>
        <meta property="og:title" content={t("Uploaded Bugs")} />
        <meta name="description" content={t("Uploaded Bugs")} />
      </Helmet>
    );
  };

  if (user) {
    tagManagerArgs.dataLayer = {
      role: user.role,
      wp_user_id: user.wp_user_id,
      tester_id: user.id,
      is_admin_page: false,
    };
  } else {
    if (error) {
      if (error.statusCode === 403) {
        window.location.href = "/";
      } else {
        alert(error.message);
      }
    }
  }
  useEffect(() => {
    const values = queryString.parse(search);
    if (values.cp) {
      campaigns.setSelected({ value: values.cp.toString(), label: "" });
    }
    if (values.status) {
      status.setSelected({ value: values.status.toString(), label: "" });
    }
  }, [queryString]);

  if (isLoading || !user) {
    return (
      <>
        {helmet()}
        <Container className="aq-py-3">
          <SpinnerWrapper>
            <Spinner />
            <Title size="xs" as="h5">
              {t("Loading")}
            </Title>
          </SpinnerWrapper>
        </Container>
      </>
    );
  }
  return (
    <>
      {helmet()}
      <TesterSidebar isAdmin={isAdmin} route={"my-bugs"}>
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
    </>
  );
}
