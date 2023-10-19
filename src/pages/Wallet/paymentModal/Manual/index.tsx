import { Modal, ModalBody } from "@appquality/appquality-design-system";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import { setPaymentModalOpen } from "src/redux/wallet/actionCreator";
import { Footer } from "./Footer";
import FormWrapper from "./FormWrapper";
import { Step0FiscalProfileRecap } from "./Step0FiscalProfileRecap";
import { Step1Iban } from "./Step1Iban";
import { Step2PaymentRequestRecap } from "./Step2PaymentRequestRecap";
import { PaymentFormType } from "./types.d";

const Manual = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
              footer={<Footer />}
            >
              <ModalBody>
                <div data-qa="manual-payment-modal">
                  {step === 0 && <Step0FiscalProfileRecap />}
                  {step === 1 && <Step1Iban />}
                  {step === 2 && <Step2PaymentRequestRecap />}
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
