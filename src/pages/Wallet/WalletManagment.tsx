import { Button, Card, Text } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { PiggyBankFill } from "react-bootstrap-icons";
import { Trans, useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import {
  setBootyDetailsModalOpen,
  setPaymentModalOpen,
} from "src/redux/wallet/actionCreator";
import {
  useGetUsersMePaymentsQuery,
  useGetUsersMeQuery,
} from "src/services/tryberApi";
import getCurrencySymbol from "src/utils/getCurrencySymbol";
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
  const [paymentInProcessing, setPaymentInProcessing] =
    useState<boolean>(false);
  const { fiscalStatus } = useSelector(
    (state: GeneralState) => ({
      fiscalStatus: state.user.fiscal.data?.fiscalStatus,
    }),
    shallowEqual
  );
  const { data: booty } = useGetUsersMeQuery({
    fields: "pending_booty,booty_threshold",
  });
  const { data } = useGetUsersMePaymentsQuery({});

  useEffect(() => {
    const paymentInProcessing =
      data?.results?.some((payment) => payment.status === "processing") ||
      false;
    setPaymentInProcessing(paymentInProcessing);
  }, [data]);

  const isVerified = fiscalStatus === "Verified";
  const isValidAmount = booty?.booty_threshold?.isOver;

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
    if (booty?.pending_booty?.net?.value === 0) {
      return (
        <Trans i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-NOMONEY MAX: 150"} />
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

  const openPaymentModal = () => {
    dispatch(setPaymentModalOpen(true));
  };

  return (
    <Card
      className="aq-mb-3"
      title={t("__WALLET_CARD-REQUEST_TITLE MAX: 40")}
      shadow
      data-qa="wallet-management"
    >
      <WalletManagmentRow>
        <div className="wallet-amount-container">
          <PiggyBankFill size={"24"} className={"aq-text-successVariant"} />
          <div className="aq-ml-2">
            <Text>{t("__WALLET_CARD-YOUR_WALLET_MAX: 15")}</Text>
            <Text
              data-qa="wallet-pending-booty"
              className={
                !isVerified ||
                booty?.pending_booty?.net?.value === 0 ||
                paymentInProcessing
                  ? "aq-text-disabled-dark"
                  : "aq-text-primary"
              }
            >
              <div>
                <strong>
                  {booty?.pending_booty?.net ? (
                    <span data-qa="net-booty">
                      {t("Net receivable")}{" "}
                      {booty?.pending_booty?.net.value.toFixed(2)}
                      {getCurrencySymbol(booty?.pending_booty?.net.currency)}
                    </span>
                  ) : (
                    <span data-qa="gross-booty">
                      {t("Gross")}{" "}
                      {booty?.pending_booty?.gross.value.toFixed(2)}
                      {getCurrencySymbol(
                        booty?.pending_booty?.gross.currency || ""
                      )}
                    </span>
                  )}
                </strong>
              </div>
              {booty?.pending_booty?.net && (
                <div data-qa="gross-booty">
                  ({t("Gross")} {booty?.pending_booty?.gross.value.toFixed(2)}
                  {getCurrencySymbol(booty?.pending_booty?.gross.currency)})
                </div>
              )}
            </Text>
          </div>
        </div>
        <Button
          type="link"
          data-qa="booty-details-cta"
          onClick={() => dispatch(setBootyDetailsModalOpen(true))}
        >
          {t("__WALLET_CARD-REQUEST_CTA-LINK MAX: 15")}
        </Button>
      </WalletManagmentRow>
      <Button
        data-qa="request-payment-cta"
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
