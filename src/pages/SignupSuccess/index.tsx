import { Trans, useTranslation } from "react-i18next";
import { PageTemplate } from "src/features/PageTemplate";
import i18n from "../../i18n";
import { LangMenu } from "src/features/LangMenu";
import {
  Button,
  Card,
  Title,
  aqBootstrapTheme,
  Text,
} from "@appquality/appquality-design-system";
import { Check2Circle } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { useLocalizeRoute } from "src/hooks/useLocalizedRoute";

export default function SignupSuccess() {
  const { t } = useTranslation();
  let history = useHistory();
  const dashboard = useLocalizeRoute("my-dashboard");
  const goToDashboard = () => {
    history.push(dashboard);
  };

  return (
    <PageTemplate
      heading={t("Signup success")}
      route={"getting-started/confirmation"}
      showSidebar={false}
      shouldBeLoggedIn
    >
      <LangMenu
        itLink={`/it/getting-started/confirmation`}
        esLink={`/es/getting-started/confirmation`}
        enLink={`/en/getting-started/confirmation`}
        className="aq-my-3 lang-navigation"
      />
      <Title size="l" as={"h1"} className="aq-mb-3 aq-text-center">
        {t("You're a Tryber now")}
      </Title>
      <Card className="aq-mb-3">
        <Check2Circle
          size="32"
          style={{ verticalAlign: "sub", orizontalAlign: "center" }}
          color={aqBootstrapTheme.palette.success}
        />
        <Text className="aq-pt-3 aq-text-primary">
          <Trans
            i18nKey={"WELCOME_SIGNUP_MESSAGE"}
            components={{
              strong: <strong />,
              br: <br />,
            }}
            defaults="<strong>Welcome aboard!</strong><br />
                We have sent you a welcome email to the address you used in the sign up process. 
                Now it’s time to explore the TRYBER universe: choose among our University courses, apply for test campaigns and join our community!"
          />
        </Text>{" "}
        <Button
          className="aq-mb-3"
          style={{ gridColumn: "auto / span 3" }}
          kind="primary"
          size="block"
          onClick={goToDashboard}
        >
          {t("Go to dashboard")}
        </Button>
      </Card>
    </PageTemplate>
  );
}
