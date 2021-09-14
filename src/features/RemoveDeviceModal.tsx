import {
  Modal,
  ModalBody,
  Button,
  BSGrid,
  Text,
  BSCol,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import userDeviceStore from "../redux/userDevices";
import siteWideMessageStore from "../redux/siteWideMessages";
import API from "../utils/api";

const RemoveDeviceModal = () => {
  const { deleteModalOpen, closeDeleteModal, fetch, current } =
    userDeviceStore();
  const { add } = siteWideMessageStore();
  const { t } = useTranslation();
  if (!current) return null;
  return (
    <Modal
      title={t("Remove device")}
      isOpen={deleteModalOpen}
      onClose={closeDeleteModal}
      size="small"
      footer={
        <BSGrid>
          <BSCol size="col-6">
            <Button
              size="block"
              flat
              type="secondary"
              onClick={closeDeleteModal}
            >
              {t("Keep")}
            </Button>
          </BSCol>
          <BSCol size="col-6">
            <Button
              size="block"
              flat
              type="danger"
              onClick={() => {
                API.deleteDevice({ deviceId: current.id })
                  .then(() => {
                    add({
                      message: (
                        <div>
                          <strong>{t(`Device removed`)}</strong>
                          <div>
                            {t(
                              `We successfully removed a device from your device list`
                            )}
                          </div>
                        </div>
                      ),
                      type: "success",
                    });
                    fetch();
                    closeDeleteModal();
                  })
                  .catch(() => {
                    add({ message: "Error", type: "danger" });
                  });
              }}
            >
              {t("Remove")}
            </Button>
          </BSCol>
        </BSGrid>
      }
    >
      <ModalBody>
        <Text className="aq-mb-3">
          {t(
            "Do you want to remove this device? This is a irreversible action."
          )}
        </Text>
        <ul>
          {"manufacturer" in current.device ? (
            <li>
              <Text>
                {t("Manufacturer")} : <b>{current.device.manufacturer}</b>
              </Text>
            </li>
          ) : null}
          {"model" in current.device ? (
            <li>
              <Text>
                {t("Model")} : <b>{current.device.model}</b>
              </Text>
            </li>
          ) : null}
          {"pc_type" in current.device ? (
            <li>
              <Text>
                {t("PC Type")} : <b>{current.device.pc_type}</b>
              </Text>
            </li>
          ) : null}
          <li>
            <Text>
              {t("Operating System")} :{" "}
              <b>{current.operating_system.platform}</b>
            </Text>
          </li>
          <li>
            <Text>
              {t("Operating System Version")} :{" "}
              <b>{current.operating_system.version}</b>
            </Text>
          </li>
        </ul>
      </ModalBody>
    </Modal>
  );
};

export default RemoveDeviceModal;
