import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { OutsideContainer, PageTemplate } from "src/features/PageTemplate";
import { PaymentModal } from "src/pages/Wallet/paymentModal";
import { getFiscalProfile } from "src/redux/user/actions/getFiscalProfile";

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
    <PageTemplate title={t("Wallet")} route={"payments"} shouldBeLoggedIn>
      <OutsideContainer>
        <PaymentModal />
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
