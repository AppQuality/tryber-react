import { Modal, ModalBody, Steps } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Footer } from "src/pages/Wallet/paymentModal/Footer";

export const PaymentModal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();
  const closeModal = () => {
    return;
  };
  const steps = [
    {
      title: t("Method"),
      isComplete: false,
      content: <div>{t("Chose payment method")}</div>,
    },
    {
      title: t("Data"),
      isComplete: false,
      content: <div>{t("Bank account owner")}</div>,
    },
    {
      title: t("Confirm"),
      isComplete: false,
      content: <div>{t("Review data")}</div>,
    },
  ];
  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      title={t("Request a payment")}
      footer={<Footer />}
    >
      <ModalBody>
        <Steps current={currentStep} className="aq-mb-3">
          {steps.map((step) => (
            <Steps.Step isCompleted={step.isComplete} title={step.title} />
          ))}
        </Steps>
        <div>{steps[currentStep].content}</div>
      </ModalBody>
    </Modal>
  );
};
