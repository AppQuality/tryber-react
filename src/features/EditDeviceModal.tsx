import { Modal, ModalBody, Title } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import userDeviceStore from "../redux/userDevices";

export default () => {
  const { modalOpen, closeModal, current } = userDeviceStore();
  const { t } = useTranslation();
  if (!current) return null;

  return (
    <Modal
      isOpen={modalOpen}
      onClose={closeModal}
      title={t("Messages for you")}
    >
      <ModalBody>{JSON.stringify(current)}</ModalBody>
    </Modal>
  );
};
