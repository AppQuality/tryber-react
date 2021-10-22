import {
  Container,
  BSGrid,
  BSCol,
  Card,
  PageTitle,
  Tabs,
  Tab,
  Button,
  Modal,
  DatepickerGlobalStyle,
  aqBootstrapTheme,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import GoogleTagManager from "../features/GoogleTagManager";
import LoggedOnly from "../features/LoggedOnly";
import TesterSidebar from "../features/TesterSidebar";
import React, { useEffect, useState, useRef } from "react";
import { FiscalProfileReport } from "../features/profile/FiscalProfileReport";
import { HeaderProfile } from "../features/profile/HeaderProfile";
import userStore from "../redux/user";
import TabBase from "../features/profile/TabBase";
import TabAdvanced from "../features/profile/TabAdvanced";
import TabFiscal from "../features/profile/TabFiscal";
import TabOptions from "../features/profile/TabOptions";
import UserDeleteModal from "../features/profile/UserDeleteModal";
import FiscalResidenceModal from "../features/profile/TabFiscal/FiscalResidenceModal";

const headerOffset = 60;

export default function Profile() {
  const { t } = useTranslation();
  let ref = useRef<HTMLDivElement>(null);
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab") || "base";
  const currentTab = ["base", "advanced", "fiscal", "options"].includes(
    tabParam
  )
    ? tabParam
    : "base";

  const [activeTab, setActiveTab] = useState(currentTab);
  const { user, getProfile, getFiscalProfile } = userStore();
  useEffect(() => {
    getProfile();
    getFiscalProfile();
  }, []);
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("tab", activeTab);
    window.history.pushState(
      {},
      "",
      window.location.origin +
        window.location.pathname +
        "?" +
        currentParams.toString()
    );
  }, [activeTab]);

  const handleEditFiscalInfo = () => {
    setActiveTab("fiscal");
    if (
      window.matchMedia(`(max-width: ${aqBootstrapTheme.grid.breakpoints.lg})`)
        .matches
    ) {
      const node = ref.current;
      if (node) {
        const offsetPosition = node.getBoundingClientRect().top - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };
  return (
    <GoogleTagManager title={t("Profile")}>
      <LoggedOnly>
        <DatepickerGlobalStyle />
        <UserDeleteModal />
        <FiscalResidenceModal />
        <TesterSidebar route={"my-account"}>
          <Container className="aq-pb-3">
            <PageTitle size="regular" as="h2" className="aq-mb-3">
              {t("Profile")}
            </PageTitle>
            <BSGrid>
              <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
                <Card className="aq-mb-3" bodyClass="">
                  <HeaderProfile />
                  <div ref={ref}>
                    <Tabs active={activeTab} setActive={setActiveTab}>
                      <Tab
                        id="base"
                        title={<span className="aq-mx-3-lg">{t("Base")}</span>}
                      >
                        <TabBase />
                      </Tab>
                      <Tab
                        id="advanced"
                        title={
                          <span className="aq-mx-3-lg">{t("Advanced")}</span>
                        }
                      >
                        <TabAdvanced />
                      </Tab>
                      <Tab
                        id="fiscal"
                        title={
                          <span className="aq-mx-3-lg">{t("Fiscal")}</span>
                        }
                      >
                        <div>
                          <TabFiscal />
                        </div>
                      </Tab>
                      <Tab
                        id="options"
                        title={
                          <span className="aq-mx-3-lg">{t("Options")}</span>
                        }
                      >
                        <TabOptions />
                      </Tab>
                    </Tabs>
                  </div>
                </Card>
              </BSCol>
              <BSCol size="col-lg-3">
                <FiscalProfileReport setActiveTab={handleEditFiscalInfo} />
              </BSCol>
            </BSGrid>
          </Container>
        </TesterSidebar>
      </LoggedOnly>
    </GoogleTagManager>
  );
}
