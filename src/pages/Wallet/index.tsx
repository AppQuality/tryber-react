import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { OutsideContainer, PageTemplate } from "src/features/PageTemplate";
import PaymentModal from "src/pages/Wallet/PaymentModal";
import { getFiscalProfile } from "src/redux/user/actions/getFiscalProfile";
import { BootyDetailsModal } from "./BootyDetailsModal/BootyDetailsModal";
import { PaymentDetailsModal } from "./PaymentDetailsModal/PaymentDetailsModal";
import { WalletHelp } from "./WalletHelp";
import { WalletManagment } from "./WalletManagment";
import { WalletTable } from "./WalletTable";

export default function Wallet() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiscalProfile());
  }, []);

  return (
    <PageTemplate
      title={t("Wallet")}
      subtitle={t(
        "Request a payment with your preferred method and keep an eye on your booty and payment history in detail."
      )}
      route={"payments"}
      shouldBeLoggedIn
    >
      <OutsideContainer>
        <BootyDetailsModal />
        <PaymentModal />
        <PaymentDetailsModal />
      </OutsideContainer>
      <BSGrid>
        <BSCol size="col-lg-9" className="aq-mb-3">
          <Card>
            <WalletTable />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <WalletManagment />
          <WalletHelp />
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
