import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { PageTemplate } from "src/features/PageTemplate";
import { WalletManagment } from "./WalletManagment";
import { WalletHelp } from "./WalletHelp";
import { WalletTable } from "./WalletTable";

export default function Wallet() {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("Wallet")} route={"payments"} shouldBeLoggedIn>
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <Card className="aq-mb-3">
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
