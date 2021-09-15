import TesterSidebar from "../features/TesterSidebar";
import {
  Container,
  BSGrid,
  BSCol,
  Card,
  Text,
  PageTitle,
  Button,
} from "@appquality/appquality-design-system";
import GoogleTagManager from "../features/GoogleTagManager";
import LoggedOnly from "../features/LoggedOnly";
import { useTranslation } from "react-i18next";
import DeviceTable from "../features/DeviceTable";
import EditDeviceModal from "../features/EditDeviceModal";
import RemoveDeviceModal from "../features/RemoveDeviceModal";
import userDeviceStore from "../redux/userDevices";

const Devices = () => {
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
                    type="success"
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
};
export default Devices;
