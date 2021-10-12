import userStore from "../../redux/user";
import { useTranslation } from "react-i18next";
import {
  Text,
  Button,
  Title,
  Card,
} from "@appquality/appquality-design-system";

interface FiscalProfileReportProps {
  setActiveTab: (tabId: string) => void;
}

export const FiscalProfileReport = ({
  setActiveTab,
}: FiscalProfileReportProps) => {
  const { user } = userStore();
  return (
    <>
      {user.fiscalStatus ? (
        user.fiscalStatus === "unverified" ? (
          <UnVerifiedFiscalProfile setActiveTab={setActiveTab} />
        ) : null
      ) : (
        <EmptyFiscalProfile setActiveTab={setActiveTab} />
      )}
    </>
  );
};

const EmptyFiscalProfile = ({ setActiveTab }: FiscalProfileReportProps) => {
  const { t } = useTranslation();
  return (
    <Card className="stick-to-header-lg aq-mb-3" shadow={true}>
      <Title size="xs" className="aq-mb-2">
        {t("Fiscal Profile Report")}
      </Title>
      <Text color="danger">
        <strong>{t("Empty profile")}</strong>
      </Text>
      <Text className="aq-mb-3">
        {t("You need to fill in your tax profile data to receive your booty")}
      </Text>
      <Button flat size="block" onClick={() => setActiveTab("fiscal")}>
        {t("Fill in now")}
      </Button>
    </Card>
  );
};
const UnVerifiedFiscalProfile = ({
  setActiveTab,
}: FiscalProfileReportProps) => {
  const { t } = useTranslation();
  return (
    <Card className="stick-to-header-lg aq-mb-3" shadow={true}>
      <Title size="xs" className="aq-mb-2">
        {t("Fiscal Profile Report")}
      </Title>
      <Text color="warning">
        <strong>{t("Invalid fiscal profile")}</strong>
      </Text>
      <Text className="aq-mb-3">
        {t("submitted data are incorrect or incomplete. Check your data again")}
      </Text>
      <Button flat size="block" onClick={() => setActiveTab("fiscal")}>
        {t("Check your data")}
      </Button>
    </Card>
  );
};
