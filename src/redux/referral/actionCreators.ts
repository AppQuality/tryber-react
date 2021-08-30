import * as actionTypes from "./actionTypes";

export const setReferral = (referral: string) => {
  const action: ReferralAction = {
    type: actionTypes.SET_REFERRAL,
    data: referral,
  };

  return (dispatch: ReferralDispatchType) => dispatch(action);
};
