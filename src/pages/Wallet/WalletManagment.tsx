import { Button, Card, Text } from "@appquality/appquality-design-system";
import { PiggyBankFill } from "react-bootstrap-icons";
import { Trans, useTranslation } from "react-i18next";
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
`;

export const WalletManagment = () => {
  const { t } = useTranslation();

  return (
    <Card title={t("__WALLET_CARD-REQUEST_TITLE MAX: 40")}>
      <WalletManagmentRow>
        <div className="wallet-amount-container">
          <PiggyBankFill size={"24"} className={"aq-text-successVariant"} />
          <div className="aq-ml-2">
            <Text>{t("__WALLET_CARD-YOUR_WALLET_MAX: 15")}</Text>
            <Text>
              {/* TODO */}
              <strong>50,00€</strong>
            </Text>
          </div>
        </div>
        <Button type="link">
          {t("__WALLET_CARD-REQUEST_CTA-LINK MAX: 15")}
        </Button>
      </WalletManagmentRow>
      <Button className="aq-mt-3" type="primary" size="block" flat>
        {t("__WALLET_CARD-REQUEST_CTA MAX: 25")}
      </Button>
      <Text className="aq-mt-2" small>
        <Trans
          i18nKey="Available tags : <fiscal_profile_link> (Link to fiscal profile):::__WALLET_CARD-REQUEST_DISCLAIMER-CHECKPROFILE MAX: 150"
          components={{
            fiscal_profile_link: <a href="/my-account/?tab=fiscal" />,
          }}
        />
      </Text>
    </Card>
  );
};
