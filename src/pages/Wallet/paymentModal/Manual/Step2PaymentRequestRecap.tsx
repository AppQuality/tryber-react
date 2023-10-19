import { useTranslation } from "react-i18next";

const RequestAmount = () => {
  return <div data-qa="manual-payment-modal-amount">Amount</div>;
};
const IntroductoryText = () => {
  return <div data-qa="manual-payment-modal-intro-text">Text</div>;
};

export const Step2PaymentRequestRecap = () => {
  const { t } = useTranslation();
  return (
    <div data-qa="manual-payment-modal-step-3">
      <IntroductoryText />
      <RequestAmount />
    </div>
  );
};
