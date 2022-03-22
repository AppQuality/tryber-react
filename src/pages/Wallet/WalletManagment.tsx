import { Button, Card, Text } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import { PiggyBankFill } from "react-bootstrap-icons";
import { Trans, useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/provider";
import { fetchBootyInfo } from "../../redux/wallet/actionCreator";
import { currencyTable } from "../../redux/wallet/utils";

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

  // initial requests
  useEffect(() => {
    dispatch(fetchBootyInfo());
  }, []);

  const isVerified = fiscalStatus === "Verified";
  const paymentInProcessing = requestsList.results?.some(
    (r) => r.status === "processing"
  );

  const isValidAmount = booty.threshold
    ? booty.amount.value >= booty.threshold
    : booty.amount.value > 0;

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
                !isVerified || booty.amount.value === 0 || paymentInProcessing
                  ? "aq-text-disabled-dark"
                  : ""
              }
            >
              <strong>
                {booty.amount.value.toFixed(2)}
                {booty.amount.currency && booty.amount.currency in currencyTable
                  ? currencyTable[booty.amount.currency]
                  : booty.amount.currency}
              </strong>
            </Text>
          </div>
        </div>
        <Button type="link">
          {t("__WALLET_CARD-REQUEST_CTA-LINK MAX: 15")}
        </Button>
      </WalletManagmentRow>
      <Button
        className="aq-mt-3"
        type="primary"
        size="block"
        disabled={!isVerified || !isValidAmount || paymentInProcessing}
        flat
      >
        {t("__WALLET_CARD-REQUEST_CTA MAX: 25")}
      </Button>
      <Text className="aq-mt-2" small>
        {paymentInProcessing ? (
          <Trans
            i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-PROCESSING MAX: 150"}
          />
        ) : isVerified ? (
          isValidAmount ? (
            <Trans
              i18nKey={
                "Available tags : <fiscal_profile_link> (Link to fiscal profile):::__WALLET_CARD-REQUEST_DISCLAIMER-CHECKPROFILE MAX: 150"
              }
              components={{
                fiscal_profile_link: <a href="/my-account/?tab=fiscal" />,
              }}
            />
          ) : booty.amount.value === 0 ? (
            <Trans
              i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-NOMONEY MAX: 150"}
            />
          ) : (
            <Trans
              i18nKey={"__WALLET_CARD-REQUEST_DISCLAIMER-NOREQUEST MAX: 150"}
            />
          )
        ) : (
          <Trans
            i18nKey={
              "Available tags : <fiscal_profile_link> (Link to fiscal profile):::__WALLET_CARD-REQUEST_DISCLAIMER-NOTCOMPLETED MAX: 150 "
            }
            components={{
              fiscal_profile_link: <a href="/my-account/?tab=fiscal" />,
            }}
          />
        )}
      </Text>
    </Card>
  );
};
