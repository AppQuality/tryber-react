import { Button } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { BaseSyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  ${Button} {
    flex-grow: 1;
    flex-basis: max-content;
    min-width: 100px;
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      flex-grow: 0;
    }
  }
`;

export const Footer = ({
  completedSteps,
  setCompletedSteps,
}: PaymentModalFooterProps) => {
  const { t } = useTranslation();
  const {
    setFieldTouched,
    validateForm,
    values,
    setValues,
    submitForm,
    isSubmitting,
  } = useFormikContext<PaymentFormType>();
  const handleNext = async (e: BaseSyntheticEvent) => {
    const { step } = values;
    if (step === 0) {
      setValues({ ...values, step: step + 1 });
      completedSteps[step] = true;
      setCompletedSteps(completedSteps);
    }
    if (step === 1) {
      setFieldTouched("termsAcceptance");
      setFieldTouched("bankaccountOwner");
      setFieldTouched("iban");
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        setValues({ ...values, step: step + 1 });
        completedSteps[step] = true;
        setCompletedSteps(completedSteps);
      }
    }
  };

  const handleBack = () => {
    const { step } = values;
    setValues({ ...values, step: step - 1 });
    completedSteps[step] = false;
    setCompletedSteps(completedSteps);
  };

  if (values.step === 3) return null;

  return (
    <StyledFooter>
      {values.step >= 1 && (
        <Button
          htmlType="button"
          className="aq-mr-2"
          onClick={handleBack}
          flat
          disabled={isSubmitting}
          data-qa="payment-modal-back"
        >
          {t("Back")}
        </Button>
      )}
      <Button
        htmlType="button"
        type="primary"
        onClick={values.step === 2 ? submitForm : handleNext}
        disabled={isSubmitting}
        data-qa="payment-modal-next"
      >
        {isSubmitting
          ? t("...wait")
          : values.step === 2
          ? t("Request payment")
          : t("Next")}
      </Button>
    </StyledFooter>
  );
};
