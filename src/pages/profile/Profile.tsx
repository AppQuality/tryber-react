import {
  Container,
  BSGrid,
  BSCol,
  Card,
  PageTitle,
  Tabs,
  Tab,
  DatepickerGlobalStyle,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import GoogleTagManager from "src/features/GoogleTagManager";
import LoggedOnly from "src/features/LoggedOnly";
import TesterSidebar from "src/features/TesterSidebar";
import React, { useEffect, useState, useRef } from "react";
import { FiscalProfileReport } from "src/features/profile/FiscalProfileReport";
import { HeaderProfile } from "src/features/profile/HeaderProfile";
import { getProfile } from "src/redux/user/actions/getProfile";
import { getFiscalProfile } from "src/redux/user/actions/getFiscalProfile";
import TabBase from "src/features/profile/TabBase";
import TabAdvanced from "src/features/profile/TabAdvanced";
import TabFiscal from "src/features/profile/TabFiscal";
import TabOptions from "src/features/profile/TabOptions";
import UserDeleteModal from "src/features/profile/UserDeleteModal";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { t } = useTranslation();
  let ref = useRef<HTMLDivElement>(null);
  let inputRef = useRef<HTMLInputElement>(null);
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab") || "base";
  const currentTab = ["base", "advanced", "fiscal", "options"].includes(
    tabParam
  )
    ? tabParam
    : "base";

  const [activeTab, setActiveTab] = useState(currentTab);
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getFiscalProfile());
  }, []);

  return (
    <GoogleTagManager title={t("Profile")}>
      <LoggedOnly>
        <DatepickerGlobalStyle />
        <UserDeleteModal />
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
                          <TabFiscal inputRef={inputRef} />
                        </div>
                      </Tab>
                      <Tab
                        id="options"
                        title={
                          <span className="aq-mx-3-lg">{t("Settings")}</span>
                        }
                      >
                        <TabOptions />
                      </Tab>
                    </Tabs>
                  </div>
                </Card>
              </BSCol>
              <BSCol size="col-lg-3">
                <FiscalProfileReport />
              </BSCol>
            </BSGrid>
          </Container>
        </TesterSidebar>
      </LoggedOnly>
    </GoogleTagManager>
  );
}
