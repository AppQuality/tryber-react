import React, { useEffect, useState } from "react";
import {
  Container,
  BSGrid,
  BSCol,
  Card,
  Spinner,
  SpinnerWrapper,
  PageTitle,
  Title,
  DatepickerGlobalStyle,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useUser } from "../store/useUser";
import { SignupMailSocial } from "../features/SignupMailSocial";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";

const tagManagerArgs = {
  dataLayer: {
    role: "unknown",
    wp_user_id: false,
    tester_id: false,
    is_admin_page: false,
  },
  dataLayerName: "PageDataLayer",
};

export default function GettingStarted() {
  const { user, error } = useUser();
  const [isLoading, setisLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [loadingMessage, setLoadingMessage] = useState(t("Loading"));
  const redirectUrl =
    i18n.language === "en" ? "/my-dashboard/" : "/it/la-mia-dashboard/";
  TagManager.dataLayer(tagManagerArgs);

  const helmet = (
    <Helmet>
      <title>{t("Getting Started")} - AppQuality Crowd</title>
      <meta
        property="og:title"
        content={t("Create a tester profile on appquality")}
      />
      <meta
        name="description"
        content={t("Create a tester profile on appquality")}
      />
    </Helmet>
  );
  useEffect(() => {
    if (user) {
      setLoadingMessage(t("Redirecting to your dashboard..."));
      window.location.href = redirectUrl;
    } else {
      if (error) {
        if (error.statusCode === 403) {
          setisLoading(false);
          // user logged out, proceed
        } else {
          alert(error.message);
        }
      }
    }
  }, [redirectUrl, t, user, error]);

  if (isLoading) {
    return (
      <>
        {helmet}
        <Container className="aq-py-3">
          <SpinnerWrapper>
            <Spinner />
            <Title size="xs" as="h5">
              {loadingMessage}
            </Title>
          </SpinnerWrapper>
        </Container>
      </>
    );
  }
  return (
    <>
      {helmet}
      <DatepickerGlobalStyle />
      <Container className="aq-pb-3">
        <BSGrid>
          <BSCol size="col-12">
            <PageTitle size="regular" as="h2">
              {t("Become an AppQuality Tester")}
            </PageTitle>
          </BSCol>
        </BSGrid>
        <BSGrid>
          <BSCol size="col-lg-9 col-xxl-8">
            <Card>
              <SignupMailSocial />
            </Card>
          </BSCol>
        </BSGrid>
      </Container>
    </>
  );
}
