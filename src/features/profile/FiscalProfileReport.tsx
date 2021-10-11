import userStore from "../../redux/user";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Text,
  Button,
  Title,
  Card,
} from "@appquality/appquality-design-system";

export const FiscalProfileReport = () => {
  const { user } = userStore();
  return (
    <>
      {user.fiscalStatus ? (
        user.fiscalStatus === "unverified" ? (
          <UnVerifiedFiscalProfile />
        ) : null
      ) : (
        <EmptyFiscalProfile />
      )}
    </>
  );
};

const EmptyFiscalProfile = () => {
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
      <Button flat size="block">
        <Link to={`/my-account/?tab=fiscal`}>{t("Fill in now")}</Link>
      </Button>
    </Card>
  );
};
const UnVerifiedFiscalProfile = () => {
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
      <Button flat size="block">
        <Link to={`/my-account/?tab=fiscal`}>{t("Check your data")}</Link>
      </Button>
    </Card>
  );
};
