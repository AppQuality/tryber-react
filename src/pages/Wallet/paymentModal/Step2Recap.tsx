import { Text } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import paypalIcon from "src/pages/Wallet/assets/paypal.svg";
import twIcon from "src/pages/Wallet/assets/transferwise.svg";
import { useAppDispatch } from "src/redux/provider";
import { getProfile } from "src/redux/user/actions/getProfile";
import dateFormatter from "src/utils/dateFormatter";

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
  const { birthDate } = useSelector(
    (state: GeneralState) => state.user.user,
    shallowEqual
  );
  useEffect(() => {
    dispatch(getProfile());
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
        {t("Total booty")}: <strong>€{amount}</strong>
      </Text>
      <div style={{ maxWidth: "430px", margin: "0 auto" }}>
        {values.paymentMethod === "paypal" ? (
          <Text className="aq-mb-2 aq-text-primary">
            Email Paypal: <strong>{values.ppAccountOwner}</strong>
          </Text>
        ) : (
          <>
            <Text className="aq-mb-2 aq-text-primary">
              {t("Account holder")}: <strong>{values.bankaccountOwner}</strong>
            </Text>
            <Text className="aq-mb-2 aq-text-primary">
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
        <Text className="aq-mb-2 aq-text-primary">
          {t("Tax ID")}: <strong>{data?.fiscalId}</strong>
        </Text>
        <Text className="aq-mb-2 aq-text-primary">
          {t("Fiscal Type")}: <strong>{data?.type}</strong>
        </Text>
        <Text className="aq-mb-2 aq-text-primary">
          {t("Birth date")}: <strong>{dateFormatter(birthDate)}</strong>
        </Text>
        <Text className="aq-text-primary">
          {t("Address")}:{" "}
          <strong>
            {data?.address.street} {data?.address.streetNumber},{" "}
            {data?.address.cityCode} {data?.address.city},{" "}
            {data?.address.country}
          </strong>
        </Text>
      </div>
    </>
  );
};
