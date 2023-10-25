import { Trans, useTranslation } from "react-i18next";
import { Text, Title } from "@appquality/appquality-design-system";
import { useGetUsersMeFiscalQuery } from "src/services/tryberApi";
import localizedUrl from "src/utils/localizedUrl";

export const Step0FiscalProfileRecap = () => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetUsersMeFiscalQuery();
  if (isLoading || !data) {
    return null;
  }
  const getFiscalTypeText = () => {
    switch (data.type) {
      case "vat":
        return t("Fiscal types:::VAT");
      case "witholding-extra":
        return t("Fiscal types:::Witholding > 5000€");
      case "company":
        return t("Fiscal types:::Company");
      case "internal":
        return t("Fiscal types:::Internal employee");
      default:
        throw new Error("Invalid fiscal type");
    }
  };
  return (
    <div data-qa="manual-payment-fiscal-profile-recap">
      <div className="aq-mb-1">
        <Text>
          <Trans
            i18nKey="available tags: <br>, <p>, <strong>, <title>, <fiscalprofilelink>, <ul>, <li>:::PAYMENTS_MODAL_INVOICE_STEP_1_RECAP{{fiscalType}}"
            values={{ fiscalType: getFiscalTypeText() }}
            components={{
              br: <br />,
              p: <p className="aq-mb-3" />,
              title: <Title size="xs" className="aq-mb-1" />,
              strong: <strong className="aq-text-primary" />,
              fiscalprofilelink: (
                <a
                  target="_blank"
                  href={localizedUrl("/my-account/?tab=fiscal")}
                />
              ),
              ul: <ul className="aq-mb-3" />,
              li: <li />,
            }}
            defaults={`
              <title>How it works</title>
              <p>
              Insert and confirm your personal information and bank details to request your payment by bank transfer. You will get a confirmation email with the gross amount and the net receivable: use these details to create the invoice you will need to send us
              </p>
              <title>What you have to do now</title>
              <p>
              <ul>
                <li>Check that your fiscal type is correct</li>
                <li>Insert your personal information and bank details and accept the conditions</li>
                <li>Send your payment request</li>
              </ul>
              </p>
              <title>Your fiscal type is:</title>
              <p>
              {{fiscalType}}
              </p>
              <strong>Need to update your fiscal type? Go to <fiscalprofilelink>your profile</fiscalprofilelink> before proceeding.</strong>
            `}
          />
        </Text>
      </div>
    </div>
  );
};
