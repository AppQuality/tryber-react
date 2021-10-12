import { useTranslation } from "react-i18next";

const TabOptions = () => {
  const { t } = useTranslation();

  return <>{t("Profile Options")}</>;
};

export default TabOptions;
