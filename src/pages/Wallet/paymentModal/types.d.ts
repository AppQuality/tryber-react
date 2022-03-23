interface PaymentModalFormProps {}
interface PaymentModalFooterProps {}
type PaymentFormType = {
  step: number;
  paymentMethod: string;
  termsAcceptance: boolean;
  ppAccountOwner: string;
  confirmEmail: string;
  bankaccountOwner: string;
  iban: string;
};
