import { useTranslation } from "react-i18next";
import {
  GetUsersMeFiscalApiResponse,
  useGetUsersMeFiscalQuery,
} from "src/services/tryberApi";

const FiscalTypeItem = ({
  type,
}: {
  type: GetUsersMeFiscalApiResponse["type"];
}) => {
  const { t } = useTranslation();

  switch (type) {
    case "vat":
      return <>{t("VAT rate scheme")}</>;
    case "witholding-extra":
      return <>{t("Annual witholding > 5000")}</>;
    case "company":
      return <>{t("Company rate scheme")}</>;
    default:
      throw new Error("Invalid fiscal type");
  }
};

export const Step0FiscalProfileRecap = () => {
  const { data, isLoading } = useGetUsersMeFiscalQuery();
  const { t } = useTranslation();

  if (isLoading || !data) return null;
  return (
    <div data-qa="manual-payment-fiscal-profile-recap">
      <div className="aq-mb-1">
        <strong className="aq-text-primary">{t("Fiscal profile recap")}</strong>
        <FiscalTypeItem type={data.type} />
      </div>
    </div>
  );
};
