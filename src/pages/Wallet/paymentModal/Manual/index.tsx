import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Formik, Modal, ModalBody } from "@appquality/appquality-design-system";
import { setPaymentModalOpen } from "src/redux/wallet/actionCreator";
import { useAppDispatch } from "src/redux/provider";
import { useTranslation } from "react-i18next";

const Manual = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isPaymentModalOpen } = useSelector(
    (state: GeneralState) => state.wallet,
    shallowEqual
  );
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {(formikProps) => {
        const closeModal = () => {
          formikProps.resetForm();
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
              footer={"footer"}
            >
              <ModalBody
                data-qa="payment-request-modal"
                id="payment-request-modal"
              >
                manual
              </ModalBody>
            </Modal>
          </form>
        );
      }}
    </Formik>
  );
};

export default Manual;
