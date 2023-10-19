import { useTranslation } from "react-i18next";

export const Step0FiscalProfileRecap = () => {
  const { t } = useTranslation();
  return (
    <div data-qa="manual-payment-fiscal-profile-recap">
      <div className="aq-mb-1">
        <strong className="aq-text-primary">{t("Fiscal profile recap")}</strong>
      </div>
    </div>
  );
};
