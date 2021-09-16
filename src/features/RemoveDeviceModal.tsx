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
import { Trans } from "react-i18next";

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
                  .catch((e) => {
                    if (e.statusCode === 406) {
                      add({
                        message: (
                          <div>
                            <strong>{t(`Oh no!`)}</strong>
                            <div>
                              {t(
                                "You can't delete this device, you are using it in a campaign!"
                              )}
                            </div>
                          </div>
                        ),
                        type: "danger",
                      });
                    } else {
                      add({ message: "Error", type: "danger" });
                    }
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
                <Trans
                  i18nKey="Manufacturer: <bold>{{manufacturer}}</bold>"
                  values={{ manufacturer: current.device.manufacturer }}
                  components={{ bold: <strong /> }}
                />
              </Text>
            </li>
          ) : null}
          {"model" in current.device ? (
            <li>
              <Text>
                <Trans
                  i18nKey="Model: <bold>{{model}}</bold>"
                  values={{ model: current.device.model }}
                  components={{ bold: <strong /> }}
                />
              </Text>
            </li>
          ) : null}
          {"pc_type" in current.device ? (
            <li>
              <Text>
                <Trans
                  i18nKey="PC Type: <bold>{{pc_type}}</bold>"
                  values={{ pc_type: current.device.pc_type }}
                  components={{ bold: <strong /> }}
                />
              </Text>
            </li>
          ) : null}
          <li>
            <Text>
              <Trans
                i18nKey="Operating System: <bold>{{platform}}</bold>"
                values={{ platform: current.operating_system.platform }}
                components={{ bold: <strong /> }}
              />
            </Text>
          </li>
          <li>
            <Text>
              <Trans
                i18nKey="Operating System Version: <bold>{{version}}</bold>"
                values={{ version: current.operating_system.version }}
                components={{ bold: <strong /> }}
              />
            </Text>
          </li>
        </ul>
      </ModalBody>
    </Modal>
  );
};

export default RemoveDeviceModal;
