import { Button, Card, Text } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { PiggyBankFill } from "react-bootstrap-icons";
import { Trans, useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { useAppDispatch } from "src/redux/provider";
import {
  fetchBooty,
  setBootyDetailsModalOpen,
  setPaymentModalOpen,
} from "src/redux/wallet/actionCreator";
import { BootyDetailsModal } from "./BootyDetailsModal/BootyDetailsModal";

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

  const fiscalStatus = useSelector(
    (state: GeneralState) => state.user.fiscal.data?.fiscalStatus,
    shallowEqual
  );
  const booty = useSelector(
    (state: GeneralState) => state.wallet.booty,
    shallowEqual
  );
  const { requestsList } = useSelector(
    (state: GeneralState) => state.wallet,
    shallowEqual
  );

  const isVerified = fiscalStatus === "Verified";
  const isValidAmount = booty.bootyThreshold?.isOver;
  const paymentInProcessing = requestsList.results?.some(
    (r) => r.status === "processing"
  );

  const getInfoText = () => {
    if (paymentInProcessing) {
      return (
        <Trans
          i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-PROCESSING MAX: 150"}
        />
      );
    } else if (isVerified) {
      if (isValidAmount) {
        return (
          <Trans
            i18nKey={
              "Available tags : <fiscal_profile_link> (Link to fiscal profile):::__WALLET_CARD-REQUEST_DISCLAIMER-CHECKPROFILE MAX: 150"
            }
            components={{
              fiscal_profile_link: <a href="/my-account/?tab=fiscal" />,
            }}
          />
        );
      } else if (booty.amount === 0) {
        return (
          <Trans
            i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-NOMONEY MAX: 150"}
          />
        );
      } else {
        return (
          <Trans
            i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-NOREQUEST MAX: 150"}
          />
        );
      }
    } else {
      return (
        <Trans
          i18nKey={
            "Available tags : <fiscal_profile_link> (Link to fiscal profile):::__WALLET_CARD-REQUEST_DISCLAIMER-NOTCOMPLETED MAX: 150"
          }
          components={{
            fiscal_profile_link: <a href="/my-account/?tab=fiscal" />,
          }}
        />
      );
    }
  };

  // initial requests
  useEffect(() => {
    dispatch(fetchBooty());
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
              <strong>{booty.amount?.toFixed(2)}€</strong>
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
        disabled={!isVerified || !isValidAmount || paymentInProcessing}
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
