import { useTranslation } from "react-i18next";
import paypalIcon from "src/pages/Wallet/assets/paypal.svg";
import twIcon from "src/pages/Wallet/assets/transferwise.svg";
import { useFormikContext } from "formik";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "src/redux/provider";
import { getFiscalProfile } from "src/redux/user/actions/getFiscalProfile";

const iconStyle = {
  verticalAlign: "middle",
  width: "33px",
  height: "33px",
};
export const Step2Recap = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<PaymentFormType>();
  const { data, loading } = useSelector(
    (state: GeneralState) => state.user.fiscal,
    shallowEqual
  );
  const { amount } = useSelector(
    (state: GeneralState) => state.wallet.booty,
    shallowEqual
  );
  useEffect(() => {
    dispatch(getFiscalProfile());
  }, []);
  return (
    <>
      {values.paymentMethod === "paypal" ? (
        <div className="aq-text-center aq-mb-2">
          <img
            style={iconStyle}
            src={paypalIcon}
            alt="paypal transfer"
            className="aq-mr-1"
          />{" "}
          <strong>PayPal</strong>
        </div>
      ) : (
        <div className="aq-text-center aq-mb-2">
          <img
            style={iconStyle}
            src={twIcon}
            alt="transferwise"
            className="aq-mr-1"
          />{" "}
          <strong>{t("Bank Transfer")}</strong>
        </div>
      )}
      <div className="aq-text-center aq-mb-3">
        {t("Total booty")}: <strong>€{amount}</strong>
      </div>
      <div style={{ maxWidth: "430px", margin: "0 auto" }}>
        {values.paymentMethod === "paypal" ? (
          <div className="aq-mb-2">
            Email Paypal: <strong>{values.ppAccountOwner}</strong>
          </div>
        ) : (
          <>
            <div className="aq-mb-2">
              {t("Account holder")}: <strong>{values.bankaccountOwner}</strong>
            </div>
            <div className="aq-mb-2">
              {t("Iban")}: <strong>{values.iban}</strong>
            </div>
          </>
        )}
        <div className="aq-mb-2 aq-pt-2">
          <strong>
            {t(
              "The following informations are retrived from your fiscal profile and will be used to generate your receipt"
            )}
          </strong>
        </div>
        <div className="aq-mb-2">
          {t("National Id Number")}: <strong>{data?.fiscalId}</strong>
        </div>
        <div className="aq-mb-2">
          {t("Fiscal Type")}: <strong>{data?.type}</strong>
        </div>
        <div className="aq-mb-2">
          {t("Birth place")}:{" "}
          <strong>
            {data?.birthPlace.city} - {data?.birthPlace.province}
          </strong>
        </div>
        <div>
          {t("Address")}:{" "}
          <strong>
            {data?.address.street} {data?.address.streetNumber},{" "}
            {data?.address.cityCode} {data?.address.city},{" "}
            {data?.address.country}
          </strong>
        </div>
      </div>
    </>
  );
};
