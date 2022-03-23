import { Modal, ModalBody, Steps } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { Footer } from "src/pages/Wallet/paymentModal/Footer";
import { Step0Method } from "src/pages/Wallet/paymentModal/Step0Method";
import { Step1Data } from "src/pages/Wallet/paymentModal/Step1Data";
import { FormWrapper } from "src/pages/Wallet/paymentModal/FormWrapper";
import { FormikProps } from "formik";
import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { setPaymentModalOpen } from "src/redux/wallet/actionCreator";
import { Step2Recap } from "src/pages/Wallet/paymentModal/Step2Recap";
import { Step3Feedback } from "src/pages/Wallet/paymentModal/Step3Feedback";
import { useAppDispatch } from "src/redux/provider";

export const PaymentModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const { isPaymentModalOpen } = useSelector(
    (state: GeneralState) => state.wallet,
    shallowEqual
  );
  const closeModal = () => {
    dispatch(setPaymentModalOpen(false));
  };
  return (
    <FormWrapper>
      {(formikProps: FormikProps<PaymentFormType>) => {
        const { step } = formikProps.values;
        return (
          <form onSubmit={formikProps.handleSubmit}>
            <Modal
              isOpen={isPaymentModalOpen}
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
                  <Steps.Step
                    isCompleted={completedSteps[1]}
                    title={t("Data")}
                  />
                  <Steps.Step
                    isCompleted={completedSteps[2]}
                    title={t("Confirm")}
                  />
                </Steps>
                {step === 0 && <Step0Method />}
                {step === 1 && <Step1Data />}
                {step === 2 && <Step2Recap />}
                {step === 3 && <Step3Feedback />}
              </ModalBody>
            </Modal>
          </form>
        );
      }}
    </FormWrapper>
  );
};
