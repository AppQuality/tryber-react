import { useTranslation } from "react-i18next";

const TabAdvanced = () => {
  const { t } = useTranslation();

  return <>{t("Advanced Profile")}</>;
};

export default TabAdvanced;
