import { Modal, ModalBody, Steps } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Footer } from "src/pages/Wallet/paymentModal/Footer";
import { PaymentMethod } from "src/pages/Wallet/paymentModal/PaymentMethod";
import { FormWrapper } from "src/pages/Wallet/paymentModal/FormWrapper";
import { FormikProps, useFormikContext } from "formik";

export const PaymentModal = () => {
  const { t } = useTranslation();
  const closeModal = () => {
    return;
  };
  const steps = [
    {
      title: t("Method"),
      isComplete: false,
      content: <PaymentMethod />,
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
    <FormWrapper>
      {(formikProps: FormikProps<PaymentFormType>) => {
        const { step } = formikProps.values;
        return (
          <Modal
            isOpen={true}
            onClose={closeModal}
            title={t("Request a payment")}
            footer={<Footer />}
          >
            <ModalBody>
              <Steps current={step} className="aq-mb-3">
                {steps.map((step) => (
                  <Steps.Step
                    isCompleted={step.isComplete}
                    title={step.title}
                  />
                ))}
              </Steps>
              <div>{steps[step].content}</div>
            </ModalBody>
          </Modal>
        );
      }}
    </FormWrapper>
  );
};
