import { Text } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { PageTemplate } from "src/features/PageTemplate";

const CampaignNotStarted = ({ startAt }: { startAt: string }) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const formatDate = useFormatDate();
  return (
    <PageTemplate
      title={t("Campaign not started yet")}
      route={`campaigns/${id}/manual/`}
      shouldBeLoggedIn
    >
      <Text>
        {t(
          "The manual is not ready yet, the activity will start on {{startAt}}, you can refresh this page to view the final manual and the activities to be carried out.",
          { startAt: formatDate(startAt) }
        )}
      </Text>
      <Text>
        {t("Need help? Contact us at")}{" "}
        <a href="mailto:support@tryber.me">support@tryber.me</a>
      </Text>
    </PageTemplate>
  );
};

const useFormatDate = () => {
  const { i18n, t } = useTranslation();
  return (dateStr: string) => {
    const dateObject = new Date(dateStr);
    const date = new Intl.DateTimeFormat(i18n.language, {
      day: "2-digit",
      month: "long",
    }).format(dateObject);
    const time = new Intl.DateTimeFormat(i18n.language, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObject);
    return t(`at_time`, { date, time });
  };
};

export { CampaignNotStarted };
