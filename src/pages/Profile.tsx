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
import { FiscalProfileStatus } from "../features/profile/FiscalProfileStatus";
import { GeneralProfile } from "../features/profile/GeneralProfile";
import userStore from "../redux/user";

export default function Profile() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("base");
  const { user, getProfile } = userStore();
  useEffect(() => {
    getProfile();
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
                  <GeneralProfile />
                  {JSON.stringify(user)}
                  <Tabs active={activeTab}>
                    <Tab id="base" title={t("Base")}>
                      {t("Base Profile")}
                    </Tab>
                    <Tab id="advanced" title={t("Advanced")}>
                      {t("Advanced Profile")}
                    </Tab>
                    <Tab id="fiscal" title={t("Fiscal")}>
                      {t("Fiscal Profile")}
                    </Tab>
                    <Tab id="option" title={t("Options")}>
                      {t("Profile Options")}
                    </Tab>
                  </Tabs>
                </Card>
              </BSCol>
              <BSCol size="col-lg-3">
                <Card
                  className="stick-to-header-lg aq-mb-3"
                  title={t("Fiscal Profile")}
                  shadow={true}
                >
                  <FiscalProfileStatus />
                </Card>
              </BSCol>
            </BSGrid>
          </Container>
        </TesterSidebar>
      </LoggedOnly>
    </GoogleTagManager>
  );
}
