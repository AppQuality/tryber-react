import { useTranslation } from "react-i18next";

const TabBase = () => {
  const { t } = useTranslation();

  return <>{t("Base Profile Alessandro suca")}</>;
};

export default TabBase;
