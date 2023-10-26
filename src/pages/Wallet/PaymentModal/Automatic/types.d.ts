interface PaymentModalFormProps {}
interface PaymentModalFooterProps {
  completedSteps: boolean[];
  setCompletedSteps: React.Dispatch<React.SetStateAction<boolean[]>>;
}
type PaymentFormType = {
  step: number;
  paymentMethod: string;
  termsAcceptance: boolean;
  ppAccountOwner: string;
  confirmEmail: string;
  bankaccountOwner: string;
  iban: string;
};
