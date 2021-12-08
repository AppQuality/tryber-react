import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { PageTemplate, PageTemplateModals } from "src/features/PageTemplate";
import userDeviceStore from "src/redux/userDevices";
import DeviceTable from "./DeviceTable";
import EditDeviceModal from "./EditDeviceModal";
import RemoveDeviceModal from "./RemoveDeviceModal";

export default function Devices() {
  const { t } = useTranslation();
  const { openAddModal } = userDeviceStore();
  return (
    <PageTemplate
      title={t("Personal Equipment")}
      route={"personal-equipment"}
      shouldBeLoggedIn
    >
      <PageTemplateModals>
        <EditDeviceModal />
        <RemoveDeviceModal />
      </PageTemplateModals>
      <BSGrid>
        <BSCol size="col-lg-9 aq-order-1 aq-order-0-lg ">
          <Card className="aq-mb-3" title={t("Your devices")}>
            <Text className="aq-mb-3">
              {t(
                "Here is the list of your all devices. Make sure to keep it updated in order to boost your chances to be selected for further projects."
              )}
            </Text>
            <DeviceTable />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <Card
            className="stick-to-header-lg aq-mb-3"
            title={t("Update your device list")}
            shadow={true}
          >
            <Text className="aq-mb-3">
              {t(
                "Adding more devices allows you to apply to more campaigns to earn more money and experience points."
              )}
            </Text>
            <Button
              onClick={() => openAddModal()}
              flat={true}
              type="primary"
              size="block"
            >
              {t("Add device")}
            </Button>
          </Card>
        </BSCol>
      </BSGrid>
    </PageTemplate>
  );
}
