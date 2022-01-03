import { useTranslation } from "react-i18next";
import {
  Text,
  Button,
  Title,
  Card,
} from "@appquality/appquality-design-system";
import { useSelector, shallowEqual } from "react-redux";

export const FiscalProfileReport = () => {
  const fiscalData = useSelector(
    (state: GeneralState) => state.user.fiscal.data,
    shallowEqual
  );
  return (
    <>
      {fiscalData?.fiscalStatus ? (
        fiscalData.fiscalStatus.toLowerCase() !== "verified" ? (
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
        {t("Status of user fiscal profile:::Fiscal Profile Report")}
      </Title>
      <Text color="danger">
        <strong>{t("Status of user fiscal profile:::Empty profile")}</strong>
      </Text>
      <Text className="aq-mb-3">
        {t("You need to fill in your tax profile data to receive your booty")}
      </Text>
    </Card>
  );
};
const UnVerifiedFiscalProfile = () => {
  const { t } = useTranslation();
  return (
    <Card className="stick-to-header-lg aq-mb-3" shadow={true}>
      <Title size="xs" className="aq-mb-2">
        {t("Status of user fiscal profile:::Fiscal Profile Report")}
      </Title>
      <Text color="warning">
        <strong>{t("Invalid fiscal profile")}</strong>
      </Text>
      <Text className="aq-mb-3">
        {t(
          "We couldn't validate your tax id. " +
            "Please check your name, surname, date of birth or place of birth in the fiscal area of your profile."
        )}
      </Text>
    </Card>
  );
};
