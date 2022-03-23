import { useTranslation } from "react-i18next";
import paypalIcon from "src/pages/Wallet/assets/paypal.svg";
import twIcon from "src/pages/Wallet/assets/transferwise.svg";
import { useFormikContext } from "formik";
import styled from "styled-components";

const iconStyle = {
  verticalAlign: "middle",
  width: "33px",
  height: "33px",
};
export const Step2Recap = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext<PaymentFormType>();
  return (
    <>
      {values.paymentMethod === "paypal" ? (
        <div className="aq-text-center">
          <img
            style={iconStyle}
            src={paypalIcon}
            alt="paypal transfer"
            className="aq-mr-3"
          />{" "}
          <strong>PayPal</strong>
        </div>
      ) : (
        <div className="aq-text-center">
          <img
            style={iconStyle}
            src={twIcon}
            alt="transferwise"
            className="aq-mr-3"
          />{" "}
          <strong>{t("Bank Transfer")}</strong>
        </div>
      )}
      <div className="aq-text-center aq-mb-3" style={{ maxWidth: "430px" }}>
        {t("Total booty")} <strong>€50</strong>
      </div>
      <div>
        {values.paymentMethod === "paypal" ? (
          <>
            <div>
              {t("Account holder")}: <strong>Ciccio Paguro</strong>
            </div>
            <div>
              {t("Iban")}: <strong>Ciccio Paguro</strong>
            </div>
          </>
        ) : (
          <div>
            'Email Paypal': <strong>cvsdywdguwd@gmail.como</strong>
          </div>
        )}
        <div>
          <strong>{t("This data is retrived from your fiscal profile")}</strong>
        </div>
        <div>
          {t("Nationl Id Number")}: <strong>CRCVLR90B56H501F</strong>
        </div>
        <div>
          {t("Fiscal Type")}: <strong>€ 5.000</strong>
        </div>
        <div>
          {t("Date of birth")}: <strong>28/02/1990</strong>
        </div>
        <div>
          {t("Address")}:{" "}
          <strong>Via Largo Gerardo 78, 61121 Montoro, IT</strong>
        </div>
      </div>
    </>
  );
};
