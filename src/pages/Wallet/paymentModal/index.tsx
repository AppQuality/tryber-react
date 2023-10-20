import { shallowEqual, useSelector } from "react-redux";
import Automatic from "src/pages/Wallet/paymentModal/Automatic";
import Manual from "src/pages/Wallet/paymentModal/Manual";

const PaymentModal = () => {
  const { fiscalType } = useSelector(
    (state: GeneralState) => ({
      fiscalStatus: state.user.fiscal.data?.fiscalStatus,
      fiscalType: state.user.fiscal.data?.type,
    }),
    shallowEqual
  );
  return (
    <div data-qa="payment-modal">
      {fiscalType === "withholding" || fiscalType === "non-italian" ? (
        <Automatic />
      ) : (
        <Manual />
      )}
    </div>
  );
};

export default PaymentModal;
