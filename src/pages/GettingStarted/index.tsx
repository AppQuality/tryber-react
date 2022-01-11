import {
  BSCol,
  BSGrid,
  Card,
  Container,
  DatepickerGlobalStyle,
  PageTitle,
} from "@appquality/appquality-design-system";
import React from "react";
import { useTranslation } from "react-i18next";
import GoogleTagManager from "src/features/GoogleTagManager";
import { LangMenu } from "src/features/LangMenu";
import NotLoggedOnly from "src/features/NotLoggedOnly";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { SignupMailSocial } from "./SignupMailSocial";

export default function GettingStarted() {
  const { t } = useTranslation();
  const redirectUrl = useLocalizeRoute("my-dashboard");
  return (
    <GoogleTagManager title={t("Getting Started")}>
      <NotLoggedOnly>
        <DatepickerGlobalStyle />
        <Container className="aq-pb-3">
          <LangMenu
            className="aq-mt-3"
            itLink="/it/getting-started/"
            esLink="/es/getting-started/"
            enLink="/getting-started/"
          />
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
                <SignupMailSocial redirectUrl={redirectUrl} />
              </Card>
            </BSCol>
          </BSGrid>
        </Container>
      </NotLoggedOnly>
    </GoogleTagManager>
  );
}
