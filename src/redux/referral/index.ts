import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setReferral } from "./actionCreators";

const ReferralStore = () => {
  const referral: string | undefined = useSelector(
    (state: GeneralState) => state.referral.current,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    referral,
    setReferral: (referral: string) => dispatch(setReferral(referral)),
  };
};

export default ReferralStore;
