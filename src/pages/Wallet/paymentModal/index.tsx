import { shallowEqual, useSelector } from "react-redux";
import Manual from "./Manual";
import Automatic from "./Automatic";

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
      {fiscalType === "withholding" || "foreign" ? <Automatic /> : <Manual />}
    </div>
  );
};

export default PaymentModal;
