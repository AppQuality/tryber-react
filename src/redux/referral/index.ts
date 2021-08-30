import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setReferral } from "./actionCreators";

export default () => {
  const referral: string | undefined = useSelector(
    (state: GeneralState) => state.referral,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    referral,
    setReferral: (referral: string) => dispatch(setReferral(referral)),
  };
};
