import { Modal, ModalBody, Steps } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { Footer } from "src/pages/Wallet/paymentModal/Footer";
import { Step0Method } from "src/pages/Wallet/paymentModal/Step0Method";
import { Step1Data } from "src/pages/Wallet/paymentModal/Step1Data";
import { FormWrapper } from "src/pages/Wallet/paymentModal/FormWrapper";
import { FormikProps } from "formik";
import { useState } from "react";
import { Step2Recap } from "src/pages/Wallet/paymentModal/Step2Recap";

export const PaymentModal = () => {
  const { t } = useTranslation();
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const closeModal = () => {
    return;
  };
  return (
    <FormWrapper>
      {(formikProps: FormikProps<PaymentFormType>) => {
        const { step } = formikProps.values;
        return (
          <Modal
            isOpen={true}
            onClose={closeModal}
            title={t("Request a payment")}
            footer={
              <Footer
                completedSteps={completedSteps}
                setCompletedSteps={setCompletedSteps}
              />
            }
          >
            <ModalBody>
              <Steps current={step} className="aq-mb-3">
                <Steps.Step
                  isCompleted={completedSteps[0]}
                  title={t("Method")}
                />
                <Steps.Step isCompleted={completedSteps[1]} title={t("Data")} />
                <Steps.Step
                  isCompleted={completedSteps[2]}
                  title={t("Confirm")}
                />
              </Steps>
              {step === 0 && <Step0Method />}
              {step === 1 && <Step1Data />}
              {step === 2 && <Step2Recap />}
            </ModalBody>
          </Modal>
        );
      }}
    </FormWrapper>
  );
};
