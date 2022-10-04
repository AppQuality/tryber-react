import { Modal, ModalBody, Steps } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePrevious } from "src/hooks/usePrevious";
import styled from "styled-components";
import { DeviceDetails } from "./DeviceDetails";
import { DeviceModalFooter } from "./DeviceModalFooter";
import { DeviceModalForm } from "./DeviceModalForm";
import { DeviceRecap } from "./DeviceRecap";
import DeviceType from "./DeviceType";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  closeEditDeviceModal,
  closeAddDeviceModal,
} from "src/pages/Devices/userDevicesSlice";

export default () => {
  const { current } = useAppSelector((state) => state.userDevices);
  const { isEditModalOpen, isAddModalOpen } = useAppSelector(
    (state) => state.userDevices
  );
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const { t } = useTranslation();
  const modalOpen = current ? isEditModalOpen : isAddModalOpen;
  const prevModalOpen: boolean = usePrevious<boolean>(modalOpen);
  const closeModal = () => {
    setStep(0);
    current
      ? dispatch(closeEditDeviceModal())
      : dispatch(closeAddDeviceModal());
  };
  let steps: WizardStep[] = [
    {
      title: t("Device details"),
      content: <DeviceDetails edit={!!current} />,
      isCompleted: (errors) =>
        !errors.operating_system_id && step > (current ? 0 : 1),
    },
    { title: t("Device recap"), content: <DeviceRecap /> },
  ];
  if (!current) {
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

  return (
    <DeviceWizard>
      <DeviceModalForm step={step} closeModal={closeModal}>
        {(formikProps: FormikProps<any>) => {
          useEffect(() => {
            formikProps.validateForm();
          }, [step]);
          useEffect(() => {
            // if passing from close to open
            if (!prevModalOpen && modalOpen) {
              formikProps.handleReset();
            }
          }, [modalOpen]);
          return (
            <Modal
              closeOnClickOutside={false}
              isOpen={modalOpen}
              onClose={() => {
                closeModal();
                formikProps.handleReset();
              }}
              title={current ? t("Edit device") : t("Add a new device")}
              footer={
                <DeviceModalFooter
                  isValid={formikProps.isValid}
                  currentStep={step}
                  steps={steps}
                  setStep={setStep}
                  onSubmit={formikProps.handleSubmit}
                />
              }
            >
              <ModalBody>
                <Steps current={step} className="aq-mb-3">
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
      </DeviceModalForm>
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
