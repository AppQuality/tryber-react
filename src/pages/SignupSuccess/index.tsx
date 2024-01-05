import { useTranslation } from "react-i18next";
import { PageTemplate } from "src/features/PageTemplate";
import i18n from "../../i18n";
import { LangMenu } from "src/features/LangMenu";
import {
  Button,
  Card,
  Title,
  aqBootstrapTheme,
} from "@appquality/appquality-design-system";
import { Check2Circle } from "react-bootstrap-icons";

export default function SignupSuccess() {
  const { t } = useTranslation();

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
        <div>
          <Check2Circle
            size="32"
            style={{ verticalAlign: "sub", orizontalAlign: "center" }}
            color={aqBootstrapTheme.palette.success}
          />
        </div>
        <div>
          <strong>{t("Welcome aboard!")}</strong>
        </div>
        <div>{t("Welcome signup message")}</div>
        <div>
          {" "}
          <Button
            className="aq-mb-3"
            style={{ gridColumn: "auto / span 3" }}
            kind="primary"
            size="block"
          >{t("Go to dashboard")}</Button>
        </div>
      </Card>
    </PageTemplate>
  );
}
