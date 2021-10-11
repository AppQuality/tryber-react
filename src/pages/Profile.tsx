import {
  Container,
  BSGrid,
  BSCol,
  Card,
  PageTitle,
  Tabs,
  Tab,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import GoogleTagManager from "../features/GoogleTagManager";
import LoggedOnly from "../features/LoggedOnly";
import TesterSidebar from "../features/TesterSidebar";
import { useEffect, useState } from "react";
import { FiscalProfileReport } from "../features/profile/FiscalProfileReport";
import { HeaderProfile } from "../features/profile/HeaderProfile";
import userStore from "../redux/user";
import TabBase from "../features/profile/TabBase";
import TabAdvanced from "../features/profile/TabAdvanced";
import TabFiscal from "../features/profile/TabFiscal";
import TabOptions from "../features/profile/TabOptions";

export default function Profile() {
  const { t } = useTranslation();
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab") || "base"; //base is default
  const [activeTab, setActiveTab] = useState(tabParam);
  const { user, getProfile, getFiscalProfile } = userStore();
  useEffect(() => {
    getProfile();
    getFiscalProfile();
  }, []);
  return (
    <GoogleTagManager title={t("Profile")}>
      <LoggedOnly>
        <TesterSidebar route={"my-account"}>
          <Container className="aq-pb-3">
            <PageTitle size="regular" as="h2" className="aq-mb-3">
              {t("Profile")}
            </PageTitle>
            <BSGrid>
              <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
                <Card className="aq-mb-3" bodyClass="">
                  <HeaderProfile />
                  <Tabs active={activeTab}>
                    <Tab id="base" title={t("Base")}>
                      <TabBase />
                    </Tab>
                    <Tab id="advanced" title={t("Advanced")}>
                      <TabAdvanced />
                    </Tab>
                    <Tab id="fiscal" title={t("Fiscal")}>
                      <TabFiscal />
                    </Tab>
                    <Tab id="option" title={t("Options")}>
                      <TabOptions />
                    </Tab>
                  </Tabs>
                </Card>
              </BSCol>
              <BSCol size="col-lg-3">
                <FiscalProfileReport setActiveTab={setActiveTab} />
              </BSCol>
            </BSGrid>
          </Container>
        </TesterSidebar>
      </LoggedOnly>
    </GoogleTagManager>
  );
}
