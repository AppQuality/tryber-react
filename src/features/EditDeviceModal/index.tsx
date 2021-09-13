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
import { Formik } from "formik";

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

  const modalOpen = edit ? editModalOpen : addModalOpen;
  const closeModal = () => {
    setStep(0);
    edit ? closeEditModal() : closeAddModal();
  };
  const steps = [];
  if (!edit) {
    steps.push({ content: <DeviceType /> });
  }
  steps.push({ content: <DeviceDetails edit={edit} /> });
  steps.push({ content: <DeviceRecap /> });

  let device_type =
    current?.type == "Smartphone"
      ? 0
      : current?.type == "Tablet"
      ? 1
      : current?.type == "PC"
      ? 2
      : current?.type == "Console"
      ? 3
      : current?.type == "Smartwatch"
      ? 4
      : current?.type == "Smart-tv"
      ? 5
      : 0;
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
      <ModalBody>
        <Formik
          initialValues={{
            device_type: device_type,
            pc_type:
              current?.device && "pc_type" in current.device
                ? current.device.pc_type
                : "",
            manufacturer:
              current?.device && "manufacturer" in current.device
                ? current.device.manufacturer
                : "",
            model:
              current?.device && "model" in current.device
                ? current.device.model
                : "",
            device:
              current && current.device && "id" in current.device
                ? current.device.id
                : 0,
            operating_system_id: current?.operating_system.id || 0,
            operating_system_platform: current?.operating_system.platform || "",
            operating_system_version: current?.operating_system.version || "",
          }}
          onSubmit={(data) => console.log(data)}
        >
          {steps[step].content}
        </Formik>
      </ModalBody>
    </Modal>
  );
};
