import userStore from "../../redux/user";
import { useTranslation } from "react-i18next";
import { Text, Button, Title } from "@appquality/appquality-design-system";

export const FiscalProfileReport = () => {
  const { user } = userStore();
  return (
    <div>
      {user.fiscalStatus ? (
        user.fiscalStatus === "verified" ? (
          <VerifiedFiscalProfile />
        ) : (
          <UnVerifiedFiscalProfile />
        )
      ) : (
        <EmptyFiscalProfile />
      )}
    </div>
  );
};

const EmptyFiscalProfile = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Title size="xs" className="aq-mb-2">
        {t("Fiscal Profile")}
      </Title>
      <Text color="danger">
        <strong>{t("Empty profile")}</strong>
      </Text>
      <Text className="aq-mb-3">
        {t("You need to fill in your tax profile data to receive your booty")}
      </Text>
      <Button flat size="block">
        {t("Fill in now")}
      </Button>
    </div>
  );
};
const VerifiedFiscalProfile = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Title size="xs" className="aq-mb-2">
        {t("Fiscal Profile")}
      </Title>
      <Text color="success" className="aq-mb-3">
        {t("Your fiscal data have been confirmed")}
      </Text>
      <Text className="aq-mb-3">
        {t("You can modify your data in the fiscal section of your profile")}
      </Text>
    </div>
  );
};
const UnVerifiedFiscalProfile = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Title size="xs" className="aq-mb-2">
        {t("Your Fiscal Profile is not valid")}
      </Title>
      <Text className="aq-mb-3">
        {t("Check your data or send an email to crowd@app-quality.com")}
      </Text>
      <Button flat size="block" type="warning">
        {t("Check your data")}
      </Button>
    </div>
  );
};
