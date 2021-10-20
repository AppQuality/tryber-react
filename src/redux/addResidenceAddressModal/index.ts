import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { toggle, open, close, updateData } from "./actionCreators";

export default () => {
  const {
    isOpen,
    address,
  }: {
    isOpen: boolean;
    address: {
      street?: string;
    };
  } = useSelector((state: GeneralState) => {
    return {
      isOpen: state.addResidenceAddressModal.open,
      address: {
        street: state.addResidenceAddressModal.street,
      },
    };
  }, shallowEqual);

  const dispatch: Dispatch<any> = useDispatch();

  return {
    isOpen: isOpen,
    address: address,
    toggle: () => dispatch(toggle()),
    open: () => dispatch(open()),
    close: () => dispatch(close()),
    updateData: (data: { street: string }) => dispatch(updateData(data)),
  };
};
