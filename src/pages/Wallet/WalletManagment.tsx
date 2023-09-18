import { Button, Card, Text } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import { PiggyBankFill } from "react-bootstrap-icons";
import { Trans, useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import {
  checkPaymentInProcessing,
  fetchBooty,
  setBootyDetailsModalOpen,
  setPaymentModalOpen,
} from "src/redux/wallet/actionCreator";
import localizedUrl from "src/utils/localizedUrl";
import styled from "styled-components";

const WalletManagmentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .wallet-amount-container {
    display: flex;
  }
  ${Button} {
    padding: 0;
    font-size: 0.875rem;
  }
  .cursor-default {
    cursor: default;
  }
`;

export const WalletManagment = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { fiscalStatus, fiscalType } = useSelector(
    (state: GeneralState) => ({
      fiscalStatus: state.user.fiscal.data?.fiscalStatus,
      fiscalType: state.user.fiscal.data?.type,
    }),
    shallowEqual
  );
  const booty = useSelector(
    (state: GeneralState) => state.wallet.booty,
    shallowEqual
  );
  const paymentInProcessing = useSelector(
    (state: GeneralState) => state.wallet.paymentInProcessing,
    shallowEqual
  );

  const isVerified = fiscalStatus === "Verified";
  const isValidAmount = booty.bootyThreshold?.isOver;
  const isValidFiscalType =
    fiscalType && ["withholding", "non-italian"].includes(fiscalType);

  const getInfoText = () => {
    if (paymentInProcessing) {
      return (
        <Trans
          i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-PROCESSING MAX: 150"}
        />
      );
    }
    if (!isVerified) {
      return (
        <Trans
          i18nKey={
            "Available tags : <fiscal_profile_link> (Link to fiscal profile):::__WALLET_CARD-REQUEST_DISCLAIMER-NOTCOMPLETED MAX: 150"
          }
          components={{
            fiscal_profile_link: (
              <a href={localizedUrl(`/my-account/?tab=fiscal`)} />
            ),
          }}
        />
      );
    }
    if (booty.amount === 0) {
      return (
        <Trans i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-NOMONEY MAX: 150"} />
      );
    }
    if (!isValidFiscalType) {
      return (
        <Trans
          i18nKey={
            "Available tags : <mail_link> (Email link for unsupported fiscal profile):::__WALLET_CARD-REQUEST_DISCLAIMER-UNSUPPORTED_FISCAL MAX: 150"
          }
          components={{
            mail_link: (
              <a href="mailto:administration@tryber.me" target="_blank" />
            ),
          }}
        />
      );
    }
    if (!isValidAmount) {
      return (
        <Trans
          i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-NOREQUEST MAX: 150"}
        />
      );
    }
    return (
      <Trans
        i18nKey={
          "Available tags : <fiscal_profile_link> (Link to fiscal profile):::__WALLET_CARD-REQUEST_DISCLAIMER-CHECKPROFILE MAX: 150"
        }
        components={{
          fiscal_profile_link: (
            <a href={localizedUrl(`/my-account/?tab=fiscal`)} />
          ),
        }}
      />
    );
  };

  // initial requests
  useEffect(() => {
    dispatch(fetchBooty());
    dispatch(checkPaymentInProcessing());
  }, []);

  const openPaymentModal = () => {
    dispatch(setPaymentModalOpen(true));
  };

  return (
    <Card
      className="aq-mb-3"
      title={t("__WALLET_CARD-REQUEST_TITLE MAX: 40")}
      shadow
    >
      <WalletManagmentRow>
        <div className="wallet-amount-container">
          <PiggyBankFill size={"24"} className={"aq-text-successVariant"} />
          <div className="aq-ml-2">
            <Text>{t("__WALLET_CARD-YOUR_WALLET_MAX: 15")}</Text>
            <Text
              className={
                !isVerified || booty.amount === 0 || paymentInProcessing
                  ? "aq-text-disabled-dark"
                  : "aq-text-primary"
              }
            >
              <strong>
                {t("Amount to get")} {booty.amount?.toFixed(2)}€
              </strong>
            </Text>
            <Text
              className={
                !isVerified || booty.amount === 0 || paymentInProcessing
                  ? "aq-text-disabled-dark"
                  : "aq-text-primary"
              }
            >
              ({t("Amount gross")} {booty.amount_gross?.toFixed(2)}€)
            </Text>
          </div>
        </div>
        <Button
          className={
            booty.amount === 0 ? "aq-text-disabled-dark cursor-default" : ""
          }
          type="link"
          onClick={() =>
            booty.amount > 0 && dispatch(setBootyDetailsModalOpen(true))
          }
        >
          {t("__WALLET_CARD-REQUEST_CTA-LINK MAX: 15")}
        </Button>
      </WalletManagmentRow>
      <Button
        className="aq-mt-3"
        type="primary"
        size="block"
        disabled={
          !isVerified ||
          !isValidAmount ||
          paymentInProcessing ||
          !isValidFiscalType
        }
        onClick={openPaymentModal}
        flat
      >
        {t("__WALLET_CARD-REQUEST_CTA MAX: 25")}
      </Button>
      <Text className="aq-mt-2" small>
        {getInfoText()}
      </Text>
    </Card>
  );
};
