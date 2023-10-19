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

export const Footer = () => {
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
    if (values.step === 0) {
      setValues({ ...values, step: values.step + 1 });
    }
    if (values.step === 1) {
      setFieldTouched("termsAcceptance");
      setFieldTouched("bankaccountOwner");
      setFieldTouched("iban");
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        setValues({ ...values, step: values.step + 1 });
      }
    }
  };

  if (values.step === 3) return null;

  return (
    <StyledFooter>
      {values.step === 2 && (
        <Button
          htmlType="button"
          onClick={() => setValues({ ...values, step: values.step - 1 })}
          flat
          disabled={isSubmitting}
          data-qa="payment-modal-back"
        >
          {t("Back")}
        </Button>
      )}
      <Button
        htmlType="button"
        onClick={values.step === 2 ? submitForm : handleNext}
        disabled={isSubmitting}
        flat
        data-qa="payment-modal-next"
      >
        {isSubmitting ? t("Loading...") : t("Next")}
      </Button>
    </StyledFooter>
  );
};
