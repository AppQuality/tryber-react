import { Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { PageTemplate } from "src/features/PageTemplate";

const NoAccess = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  return (
    <PageTemplate
      title={t("You do not have access to this campaign")}
      route={`campaigns/${id}/manual`}
      shouldBeLoggedIn
    >
      <Text>
        {t("Need help? Contact us at")}{" "}
        <a href="mailto:support@tryber.me">support@tryber.me</a>
      </Text>
    </PageTemplate>
  );
};

export { NoAccess };
