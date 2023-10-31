import { Modal, ModalBody, Steps } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { Footer } from "src/pages/Wallet/PaymentModal/Automatic/Footer";
import { FormWrapper } from "src/pages/Wallet/PaymentModal/Automatic/FormWrapper";
import { Step0Method } from "src/pages/Wallet/PaymentModal/Automatic/Step0Method";
import { Step1Data } from "src/pages/Wallet/PaymentModal/Automatic/Step1Data";
import { Step2Recap } from "src/pages/Wallet/PaymentModal/Automatic/Step2Recap";
import { Step3Feedback } from "src/pages/Wallet/PaymentModal/Automatic/Step3Feedback";
import { useAppDispatch } from "src/redux/provider";
import { setPaymentModalOpen } from "src/redux/wallet/actionCreator";

const Automatic = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const { isPaymentModalOpen } = useSelector(
    (state: GeneralState) => state.wallet,
    shallowEqual
  );

  return (
    <FormWrapper>
      {(formikProps: FormikProps<PaymentFormType>) => {
        const { step } = formikProps.values;
        const closeModal = () => {
          formikProps.resetForm();
          setCompletedSteps([false, false, false]);
          dispatch(setPaymentModalOpen(false));
        };
        return (
          <form
            onSubmit={formikProps.handleSubmit}
            onReset={formikProps.handleReset}
            data-qa="automatic-payment-modal"
          >
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
                    title={t("Start here", {
                      context: "MODAL_PAYMENT_STEP_TITLE",
                    })}
                  />
                  <Steps.Step
                    isCompleted={completedSteps[1]}
                    title={t("Insert details", {
                      context: "MODAL_PAYMENT_STEP_TITLE",
                    })}
                  />
                  <Steps.Step
                    isCompleted={completedSteps[2]}
                    title={t("Confirm", {
                      context: "MODAL_PAYMENT_STEP_TITLE",
                    })}
                  />
                </Steps>
                <div data-qa="automatic-payment-modal">
                  {step === 0 && <Step0Method />}
                  {step === 1 && <Step1Data />}
                  {step === 2 && <Step2Recap />}
                  {step === 3 && <Step3Feedback />}
                </div>
              </ModalBody>
            </Modal>
          </form>
        );
      }}
    </FormWrapper>
  );
};

export default Automatic;
