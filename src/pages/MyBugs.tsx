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
import { useUser } from "../store/useUser";
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

export default function MyBugs({ isMenuOpen }: { isMenuOpen: boolean }) {
  const { search } = useLocation();
  const { user, error } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(true);

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

  useEffect(() => {
    if (user) {
      const values = queryString.parse(search);
      if (values.cp) {
        campaigns.setSelected({ value: values.cp.toString(), label: "" });
      }
      if (values.status) {
        status.setSelected({ value: values.status.toString(), label: "" });
      }
      tagManagerArgs.dataLayer = {
        role: user.role,
        wp_user_id: user.wp_user_id,
        tester_id: user.id,
        is_admin_page: false,
      };

      setIsAdmin(["administrator", "tester_lead"].includes(user.role));
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
      <TesterSidebar
        isAdmin={isAdmin}
        route={"my-bugs"}
        openFromHeader={isMenuOpen}
      >
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
