import {
  Checkbox,
  Field,
  FormGroup,
  Formik,
  FormikField,
  Modal,
  ModalBody,
  Text,
} from "@appquality/appquality-design-system";
import { ErrorMessage, FieldProps, FormikHelpers } from "formik";
import { BaseSyntheticEvent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "src/redux/provider";
import { setPaymentModalOpen } from "src/redux/wallet/actionCreator";
import * as yup from "yup";
import { Footer } from "./Footer";
import { Step0FiscalProfileRecap } from "./Step0FiscalProfileRecap";

const Manual = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isPaymentModalOpen } = useSelector(
    (state: GeneralState) => state.wallet,
    shallowEqual
  );
  type PaymentFormType = {
    termsAcceptance: boolean;
    bankaccountOwner: string;
    iban: string;
    step: number;
  };
  const initialValues: PaymentFormType = {
    termsAcceptance: false,
    bankaccountOwner: "",
    iban: "",
    step: 0,
  };
  const validationSchema = yup.object({
    termsAcceptance: yup
      .boolean()
      .required(t("This is a required field"))
      .oneOf([true], t("you must accept terms and conditions")),
    bankaccountOwner: yup
      .string()
      .required(t("This is a required field"))
      .matches(/^.+ .+$/gi, t("Insert Name and surname separated by space"))
      .matches(
        /^[A-Za-zÀ-ÖØ-öø-ÿ'-ū.]+ ['A-Za-zÀ-Ö Ø-öø-ÿ-ū.]+$/gi,
        t("The account holder name should contain latin character only")
      ),
    iban: yup
      .string()
      .required("This is a required field")
      .matches(
        /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/g,
        t("This is an invalid format.")
      ),
  });
  const onSubmit = async (
    values: PaymentFormType,
    formikHelper: FormikHelpers<PaymentFormType>
  ) => {
    formikHelper.setSubmitting(true);
    formikHelper.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
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
                  {step === 1 && (
                    <div data-qa="manual-payment-modal-step-1">
                      <Text data-qa="manual-payment-modal-introduction-text">
                        {t("__MODAL_MANUAL_PAYMENT_INTRODUCTION_TEXT__")}
                      </Text>
                      <Field
                        name="bankaccountOwner"
                        type="text"
                        label={t("Account Holder")}
                        placeholder={t("name")}
                        data-qa="manual-payment-modal-account-holder"
                      />
                      <Field
                        name="iban"
                        type="text"
                        label={t("IBAN")}
                        placeholder="OT2T26635625325382772"
                        data-qa="manual-payment-modal-iban"
                      />
                      <FormikField name="termsAcceptance" className="aq-mb-3">
                        {({ field, form, meta }: FieldProps) => {
                          const onCheckChange = (e: BaseSyntheticEvent) => {
                            field.onChange(e);
                            form.setFieldValue(field.name, e.target.checked);
                          };
                          return (
                            <FormGroup data-qa="manual-payment-modal-terms">
                              <Checkbox
                                id="termsAcceptance"
                                name={field.name}
                                onChange={onCheckChange}
                                checked={field.value}
                                label={
                                  <strong className="aq-text-primary">
                                    <Trans
                                      i18nKey={
                                        "Accept the <terms_and_conditions_link>conditions</terms_and_conditions_link> before proceeding"
                                      }
                                      components={{
                                        terms_and_conditions_link: (
                                          <a
                                            data-qa="manual-payment-modal-terms-and-conditions-link"
                                            target="_blank"
                                            rel="noreferrer"
                                            href={t("/payment_conditions", {
                                              ns: "links",
                                            })}
                                          />
                                        ),
                                      }}
                                    />
                                  </strong>
                                }
                                onBlur={field.onBlur}
                              />
                              <ErrorMessage name={field.name} />
                            </FormGroup>
                          );
                        }}
                      </FormikField>
                    </div>
                  )}
                </div>
              </ModalBody>
            </Modal>
          </form>
        );
      }}
    </Formik>
  );
};

export default Manual;
