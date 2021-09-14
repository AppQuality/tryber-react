import {
  Modal,
  ModalBody,
  Button,
  Steps,
} from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import userDeviceStore from "../../redux/userDevices";
import siteWideMessageStore from "../../redux/siteWideMessages";
import { ReactNode, useEffect, useState } from "react";
import DeviceType from "./DeviceType";
import DeviceDetails from "./DeviceDetails";
import DeviceRecap from "./DeviceRecap";
import { Formik, FormikErrors } from "formik";
import styled from "styled-components";

interface WizardStep {
  title: string;
  content: ReactNode;
  isCompleted?: (errors: FormikErrors<any>) => boolean;
}

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
  let steps: WizardStep[] = [
    {
      title: t("Device details"),
      content: <DeviceDetails edit={edit} />,
      isCompleted: (errors) => !errors.operating_system_id && step > 1,
    },
    { title: t("Device recap"), content: <DeviceRecap /> },
  ];
  if (!edit) {
    steps = [
      {
        title: t("Device type"),
        content: <DeviceType />,
        isCompleted: (errors) => {
          return !errors.device_type && step > 0;
        },
      },
      ...steps,
    ];
  }
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
      : -1;
  console.log(device_type);
  return (
    <DeviceWizard>
      <Formik
        enableReinitialize
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
        isInitialValid={false}
        validate={(values) => {
          const errors: { device_type?: string; operating_system_id?: string } =
            {};
          if (step === 0 && values.device_type === -1) {
            errors.device_type = "required";
          }
          if (
            step === 1 &&
            values.operating_system_id === 0 &&
            !values.pc_type &&
            !values.device
          ) {
            errors.operating_system_id = "required";
          }
          return errors;
        }}
      >
        {(formikProps) => {
          useEffect(() => {
            formikProps.validateForm();
          }, [step]);
          return (
            <Modal
              isOpen={modalOpen}
              onClose={() => {
                closeModal();
                formikProps.handleReset();
              }}
              title={edit ? t("Edit device") : t("Add new device")}
              footer={
                <div className="device-wizard-footer">
                  <Button
                    type="primary"
                    flat={true}
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}
                  >
                    {t("Back")}
                  </Button>
                  {step === steps.length - 1 ? (
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
                      onClick={() => {
                        setStep(step + 1);
                      }}
                      flat={true}
                      disabled={step > steps.length - 1 || !formikProps.isValid}
                    >
                      {t("Next")}
                    </Button>
                  )}
                </div>
              }
            >
              <ModalBody>
                <Steps current={step}>
                  {steps.map((step, index) => (
                    <Steps.Step
                      key={index}
                      className="device-wizard-step"
                      isCompleted={
                        step.isCompleted && step.isCompleted(formikProps.errors)
                      }
                      title={step.title}
                    />
                  ))}
                </Steps>
                <div className="device-wizard-content">
                  {steps[step].content}
                </div>
              </ModalBody>
            </Modal>
          );
        }}
      </Formik>
    </DeviceWizard>
  );
};

const DeviceWizard = styled.div`
  .device-wizard-footer {
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
  }
`;
