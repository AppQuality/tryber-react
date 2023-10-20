import { Trans, useTranslation } from "react-i18next";
import {
  GetUsersMeFiscalApiResponse,
  useGetUsersMeFiscalQuery,
} from "src/services/tryberApi";
import localizedUrl from "src/utils/localizedUrl";

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

const UpdateFiscalProfile = () => {
  const { t } = useTranslation();

  return (
    <Trans
      i18nKey={
        "Need to update your fiscal type? Go to <profile_fiscal_link>your profile</profile_fiscal_link> before proceeding."
      }
      components={{
        profile_fiscal_link: (
          <a
            target="_blank"
            rel="noreferrer"
            href={localizedUrl("/my-account/?tab=fiscal")}
          />
        ),
      }}
    />
  );
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
        <UpdateFiscalProfile />
      </div>
    </div>
  );
};
