import { useTranslation } from "react-i18next";

export const Step3Success = () => {
  const { t } = useTranslation();
  return <div data-qa="manual-payment-modal-step-4">Success</div>;
};
