import { Text } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import paypalIcon from "src/pages/Wallet/assets/paypal.svg";
import twIcon from "src/pages/Wallet/assets/transferwise.svg";
import { useGetUsersMeQuery } from "src/services/tryberApi";
import dateFormatter from "src/utils/dateFormatter";
import getCurrencySymbol from "src/utils/getCurrencySymbol";

const iconStyle = {
  verticalAlign: "middle",
  width: "33px",
  height: "33px",
};
export const Step2Recap = () => {
  const { t } = useTranslation();

  const { values } = useFormikContext<PaymentFormType>();
  const { data } = useSelector(
    (state: GeneralState) => state.user.fiscal,
    shallowEqual
  );
  const { data: booty } = useGetUsersMeQuery({
    fields: "pending_booty,birthDate",
  });
  const net = booty?.pending_booty?.net;
  const gross = booty?.pending_booty?.gross;
  const birthDate = booty?.birthDate || "";
  const fiscalType =
    data?.type === "withholding"
      ? t("__WALLET_MODAL-REQUEST_FISCAL-TYPE_WITHHOLDING MAX: 20")
      : data?.type === "non-italian"
      ? t("__WALLET_MODAL-REQUEST_FISCAL-TYPE_NON_ITALIAN MAX: 20")
      : t("__WALLET_MODAL-REQUEST_FISCAL-TYPE_INVALID MAX: 20");

  if (!data) {
    return null;
  }
  const getFiscalTypeText = () => {
    switch (data.type) {
      case "withholding":
        return t("Fiscal types:::Witholding < 5000€");
      case "non-italian":
        return t("Fiscal types:::Foreign");
      default:
        throw new Error("Invalid fiscal type");
    }
  };
  return (
    <div data-qa="automatic-payment-modal-step-3">
      {values.paymentMethod === "paypal" ? (
        <div className="aq-text-center aq-mb-2">
          <img
            style={iconStyle}
            src={paypalIcon}
            alt="paypal transfer"
            className="aq-mr-1"
          />{" "}
          <strong className="aq-text-primary">PayPal</strong>
        </div>
      ) : (
        <div className="aq-text-center aq-mb-2">
          <img
            style={iconStyle}
            src={twIcon}
            alt="transferwise"
            className="aq-mr-1"
          />{" "}
          <strong className="aq-text-primary">{t("Bank Transfer")}</strong>
        </div>
      )}
      <Text className="aq-text-center aq-mb-3 aq-text-primary">
        <>
          {net ? t("Net receivable") : t("Gross amount")}:{" "}
          <strong>
            {net ? (
              <span data-qa="payment-modal-net-booty">
                {getCurrencySymbol(net.currency)}
                {net.value.toFixed(2)}
              </span>
            ) : (
              <span data-qa="payment-modal-gross-booty">
                {getCurrencySymbol(gross?.currency || "")}
                {gross?.value.toFixed(2)}
              </span>
            )}
          </strong>
          <br />
        </>
        {net && (
          <span data-qa="payment-modal-gross-booty">
            ({t("Gross")}: {getCurrencySymbol(gross?.currency || "")}
            {gross?.value.toFixed(2)})
          </span>
        )}
      </Text>
      <div style={{ maxWidth: "430px", margin: "0 auto" }}>
        {values.paymentMethod === "paypal" ? (
          <Text className="aq-mb-2 aq-text-primary" data-qa="pp-email">
            Email Paypal: <strong>{values.ppAccountOwner}</strong>
          </Text>
        ) : (
          <>
            <Text
              className="aq-mb-2 aq-text-primary"
              data-qa="bankAccount-owner"
            >
              {t("Account holder")}: <strong>{values.bankaccountOwner}</strong>
            </Text>
            <Text
              className="aq-mb-2 aq-text-primary"
              data-qa="bankAccount-iban"
            >
              {t("IBAN")}: <strong>{values.iban}</strong>
            </Text>
          </>
        )}
        <div className="aq-mb-2 aq-pt-2 aq-text-primary">
          <strong>
            {t(
              "The following informations are retrived from your fiscal profile and will be used to generate your receipt"
            )}
          </strong>
        </div>
        <Text
          className="aq-mb-2 aq-text-primary"
          data-qa={`fiscalType-${data?.type}`}
        >
          {t("Fiscal type")}: <strong>{getFiscalTypeText()}</strong>
        </Text>
        <Text className="aq-mb-2 aq-text-primary" data-qa="taxID-number">
          {t("Tax identification number:::Tax ID")}:{" "}
          <strong>{data?.fiscalId}</strong>
        </Text>
        <Text className="aq-mb-2 aq-text-primary" data-qa="birthDate">
          {t("Birth date")}: <strong>{dateFormatter(birthDate)}</strong>
        </Text>
        <Text className="aq-text-primary" data-qa="fiscalAddress">
          {t("Address")}:{" "}
          <strong>
            {data?.address.street} {data?.address.streetNumber},{" "}
            {data?.address.cityCode} {data?.address.city},{" "}
            {data?.address.country}
          </strong>
        </Text>
      </div>
    </div>
  );
};
