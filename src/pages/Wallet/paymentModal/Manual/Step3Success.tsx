import { useTranslation } from "react-i18next";

const SuccessMessage = () => {
  return <div data-qa="manual-payment-modal-success-text">Success</div>;
};

export const Step3Success = () => {
  const { t } = useTranslation();
  return (
    <div data-qa="manual-payment-modal-step-4">
      <SuccessMessage />
    </div>
  );
};
