import { Button, CSSGrid } from "@appquality/appquality-design-system";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  ${Button} {
    flex-grow: 1;
    flex-basis: 100px;
    @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
      flex-grow: 0;
    }
  }
`;

export const Footer: React.FunctionComponent<PaymentModalFooterProps> = ({
  completedSteps,
  setCompletedSteps,
}) => {
  const { t } = useTranslation();
  const {
    values: { step },
    setFieldValue,
    validateForm,
    setFieldTouched,
    resetForm,
  } = useFormikContext<PaymentFormType>();
  const onClickBack = () => {
    if (step === 3) {
      // close modal
      alert("reset form and closeModal");
      resetForm();
    } else {
      // decrement step
      setFieldValue("step", step - 1);
    }
  };
  const incrementStep = async () => {
    if (step === 0) {
      setFieldTouched("paymentMethod");
      setFieldTouched("termsAcceptance");
    }
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      completedSteps[step] = true;
      setCompletedSteps(completedSteps);
      setFieldValue("step", step + 1);
    }
  };
  return (
    <StyledFooter>
      {step > 0 && (
        <Button flat onClick={onClickBack} className="aq-mr-3">
          {step === 3 ? t("Back to wallet") : t("Back")}
        </Button>
      )}
      {step < 2 && (
        <Button flat onClick={incrementStep}>
          {t("Continue")}
        </Button>
      )}
      {step === 2 && (
        <Button flat htmlType="submit">
          {t("Request payment")}
        </Button>
      )}
    </StyledFooter>
  );
};
