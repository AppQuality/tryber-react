import { Modal, ModalBody, Steps } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import { setPaymentModalOpen } from "src/redux/wallet/actionCreator";
import { Footer } from "./Footer";
import FormWrapper from "./FormWrapper";
import { Step0FiscalProfileRecap } from "./Step0FiscalProfileRecap";
import { Step1Iban } from "./Step1Iban";
import { Step2PaymentRequestRecap } from "./Step2PaymentRequestRecap";
import { Step3Success } from "./Step3Success";
import { PaymentFormType } from "./types";

const Manual = () => {
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
          dispatch(setPaymentModalOpen(false));
        };
        return (
          <form
            onSubmit={formikProps.handleSubmit}
            onReset={formikProps.handleReset}
          >
            <Modal
              isOpen={isPaymentModalOpen}
              onClose={closeModal}
              title={t("Request a payment")}
              footer={
                step < 3 && (
                  <Footer
                    completedSteps={completedSteps}
                    setCompletedSteps={setCompletedSteps}
                  />
                )
              }
            >
              <ModalBody>
                {step < 3 && (
                  <Steps current={step} className="aq-mb-3">
                    <Steps.Step
                      isCompleted={completedSteps[0]}
                      title={t("Start here", {
                        context: "MANUAL_PAYMENT_STEP_TITLE",
                      })}
                    />
                    <Steps.Step
                      isCompleted={completedSteps[1]}
                      title={t("Insert details", {
                        context: "MANUAL_PAYMENT_STEP_TITLE",
                      })}
                    />
                    <Steps.Step
                      isCompleted={completedSteps[2]}
                      title={t("Get email", {
                        context: "MANUAL_PAYMENT_STEP_TITLE",
                      })}
                    />
                  </Steps>
                )}
                <div data-qa="manual-payment-modal">
                  {step === 0 && <Step0FiscalProfileRecap />}
                  {step === 1 && <Step1Iban />}
                  {step === 2 && <Step2PaymentRequestRecap />}
                  {step === 3 && <Step3Success />}
                </div>
              </ModalBody>
            </Modal>
          </form>
        );
      }}
    </FormWrapper>
  );
};

export default Manual;
