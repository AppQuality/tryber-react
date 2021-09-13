import { Modal, ModalBody, Button } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import userDeviceStore from "../../redux/userDevices";
import siteWideMessageStore from "../../redux/siteWideMessages";
import { useState } from "react";
import DeviceType from "./DeviceType";
import DeviceDetails from "./DeviceDetails";
import DeviceRecap from "./DeviceRecap";
import { Formik } from "formik";
import styled from "styled-components";

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
        <FooterBurrito>
          <Button
            type="primary"
            flat={true}
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
          >
            {t("Back")}
          </Button>
          {step == steps.length - 1 ? (
            <Button
              type="success"
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
              onClick={() => setStep(step + 1)}
              flat={true}
              disabled={step > steps.length - 1}
            >
              {t("Next")}
            </Button>
          )}
        </FooterBurrito>
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

const FooterBurrito = styled.div`
  display: grid;
  grid-template-areas: "prev next";
  grid-template-columns: 1fr 1fr;
  grid-gap: ${(props) => props.theme.grid.spacing.default};

  @media (min-width: ${(props) => props.theme.grid.breakpoints.lg}) {
    grid-template-areas: "empty prev next";
    grid-template-columns: 1fr auto auto;
  }
  button {
    min-width: 120px;
  }
  button:first-child {
    grid-area: prev;
  }
  button:last-child {
    grid-area: next;
  }
`;
