import * as actionTypes from "./actionTypes";

const REFERRAL_KEY = "appq-referral";

const initialState: ReferralState =
  localStorage.getItem(REFERRAL_KEY) || undefined;

const reducer = (
  state: ReferralState = initialState,
  action: ReferralAction
): ReferralState => {
  switch (action.type) {
    case actionTypes.SET_REFERRAL:
      if (!action.data) {
        return state;
      }

      localStorage.setItem(REFERRAL_KEY, action.data);
      return action.data;
  }
  return state;
};

export default reducer;
