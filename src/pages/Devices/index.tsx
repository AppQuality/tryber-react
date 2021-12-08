import {
  BSCol,
  BSGrid,
  Button,
  Card,
  Container,
  PageTitle,
  Text,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import GoogleTagManager from "src/features/GoogleTagManager";
import LoggedOnly from "src/features/LoggedOnly";
import TesterSidebar from "src/features/TesterSidebar";
import userDeviceStore from "src/redux/userDevices";
import DeviceTable from "./DeviceTable";
import EditDeviceModal from "./EditDeviceModal";
import RemoveDeviceModal from "./RemoveDeviceModal";

export default function Devices() {
  const { t } = useTranslation();
  const { openAddModal } = userDeviceStore();
  return (
    <GoogleTagManager title={t("Personal Equipment")}>
      <LoggedOnly>
        <EditDeviceModal />
        <RemoveDeviceModal />
        <TesterSidebar route={"personal-equipment"}>
          <Container className="aq-pb-3">
            <PageTitle size="regular" as="h2" className="aq-mb-3">
              {t("Devices")}
            </PageTitle>
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
          </Container>
        </TesterSidebar>
      </LoggedOnly>
    </GoogleTagManager>
  );
}
