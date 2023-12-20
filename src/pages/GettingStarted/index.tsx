import {
  BSCol,
  BSGrid,
  Card,
  Container,
  DatepickerGlobalStyle,
  Title,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { LangMenu } from "src/features/LangMenu";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";
import { SignupMailSocial } from "./SignupMailSocial";
import { PageTemplate } from "src/features/PageTemplate";

export default function GettingStarted() {
  const { t } = useTranslation();
  const redirectUrl = useLocalizeRoute("my-dashboard");
  return (
    <PageTemplate route="getting-started">
      <DatepickerGlobalStyle />
      <Container className="aq-pb-3">
        <LangMenu
          className="aq-mt-3"
          itLink="/it/getting-started/"
          esLink="/es/getting-started/"
          enLink="/getting-started/"
        />
        <Title size="l" as={"h1"}>
          {t("Become an AppQuality Tester")}
        </Title>
        <BSGrid>
          <BSCol size="col-lg-9 col-xxl-8">
            <Card>
              <SignupMailSocial redirectUrl={redirectUrl} />
            </Card>
          </BSCol>
        </BSGrid>
      </Container>
    </PageTemplate>
  );
}
