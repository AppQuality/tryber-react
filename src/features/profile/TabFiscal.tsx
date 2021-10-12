import { useTranslation } from "react-i18next";

const TabFiscal = () => {
  const { t } = useTranslation();

  return <>{t("Fiscal Profile")}</>;
};

export default TabFiscal;
