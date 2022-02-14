import {
  BSCol,
  BSGrid,
  Card,
  DatepickerGlobalStyle,
  Tab,
  Tabs,
} from "@appquality/appquality-design-system";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { OutsideContainer, PageTemplate } from "src/features/PageTemplate";
import { getFiscalProfile } from "src/redux/user/actions/getFiscalProfile";
import { getProfile } from "src/redux/user/actions/getProfile";

import useTabFragment from "./effects/useTabFragment";
import { FiscalProfileReport } from "./FiscalProfileReport";
import { HeaderProfile } from "./HeaderProfile";
import TabAdvanced from "./TabAdvanced";
import TabBase from "./TabBase";
import TabFiscal from "./TabFiscal";
import TabOptions from "./TabOptions";
import UserDeleteModal from "./TabOptions/UserDeleteModal";

export default function Profile() {
  const { t } = useTranslation();
  let ref = useRef<HTMLDivElement>(null);
  const { activeTab, setActiveTab } = useTabFragment();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
    dispatch(getFiscalProfile());
  }, []);

  return (
    <PageTemplate title={t("Profile")} route={"my-account"} shouldBeLoggedIn>
      <OutsideContainer>
        <UserDeleteModal />
      </OutsideContainer>
      <DatepickerGlobalStyle />
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
                  title={<span className="aq-mx-3-lg">{t("Advanced")}</span>}
                >
                  <TabAdvanced />
                </Tab>
                <Tab
                  id="fiscal"
                  title={<span className="aq-mx-3-lg">{t("Fiscal")}</span>}
                >
                  <div>
                    <TabFiscal />
                  </div>
                </Tab>
                <Tab
                  id="options"
                  title={<span className="aq-mx-3-lg">{t("Settings")}</span>}
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
    </PageTemplate>
  );
}
