import {
  Container,
  BSGrid,
  BSCol,
  Card,
  PageTitle,
  DatepickerGlobalStyle,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { SignupMailSocial } from "../features/SignupMailSocial";
import GoogleTagManager from "../features/GoogleTagManager";
import NotLoggedOnly from "../features/NotLoggedOnly";

export default function GettingStarted() {
  const { t } = useTranslation();
  return (
    <GoogleTagManager title={t("Getting Started")}>
      <NotLoggedOnly>
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
      </NotLoggedOnly>
    </GoogleTagManager>
  );
}
