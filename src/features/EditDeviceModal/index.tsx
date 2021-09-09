import {
  Modal,
  ModalBody,
  BSGrid,
  BSCol,
  Button,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import userDeviceStore from "../../redux/userDevices";
import siteWideMessageStore from "../../redux/siteWideMessages";
import { useState } from "react";
import DeviceType from "./DeviceType";
import DeviceDetails from "./DeviceDetails";
import DeviceRecap from "./DeviceRecap";

export default ({ edit = true }: { edit?: boolean }) => {
  const {
    editModalOpen,
    addModalOpen,
    closeEditModal,
    closeAddModal,
    current,
  } = userDeviceStore();
  const { add } = siteWideMessageStore();
  const [step, setStep] = useState(0);
  const { t } = useTranslation();
  if (!current) return null;

  const modalOpen = edit ? editModalOpen : addModalOpen;
  const closeModal = () => {
    setStep(0);
    edit ? closeEditModal() : closeAddModal();
  };
  const steps = [];
  if (!edit) {
    steps.push({ content: <DeviceType /> });
  }
  steps.push({ content: <DeviceDetails /> });
  steps.push({ content: <DeviceRecap /> });

  return (
    <Modal
      isOpen={modalOpen}
      onClose={closeModal}
      title={edit ? t("Edit device") : t("Add new device")}
      footer={
        <BSGrid>
          <BSCol size="col-6"></BSCol>
          <BSCol size="col-3">
            <Button
              type="primary"
              size="block"
              flat={true}
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
            >
              {t("Back")}
            </Button>
          </BSCol>
          <BSCol size="col-3">
            {step == steps.length - 1 ? (
              <Button
                type="success"
                size="block"
                onClick={() => {
                  add({ message: "ok", type: "success" });
                  closeModal();
                }}
                flat={true}
                disabled={step > steps.length - 1}
              >
                {edit ? t("Edit device") : t("Add device")}
              </Button>
            ) : (
              <Button
                type="primary"
                size="block"
                onClick={() => setStep(step + 1)}
                flat={true}
                disabled={step > steps.length - 1}
              >
                {t("Next")}
              </Button>
            )}
          </BSCol>
        </BSGrid>
      }
    >
      <ModalBody>{steps[step].content}</ModalBody>
    </Modal>
  );
};
