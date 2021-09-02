import * as actionTypes from "./actionTypes";
import API from "../../utils/api";
import WPAPI from "../../utils/wpapi";

export function refreshUser() {
  const action: UserAction = {
    type: actionTypes.USER_REFRESH,
  };

  return (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.USER_LOAD });
    return API.me()
      .then((user) => {
        user.isAdmin = ["administrator", "tester_lead"].includes(user.role);
        API.getOnboardingComplete()
          .then((data) => {
            user.onboarding_complete = data.onboarding_complete;
            action.data = user;
            return dispatch(action);
          })
          .catch((e) => {
            dispatch({ type: actionTypes.USER_FAILED, error: e });
          });
      })
      .catch((e) => {
        dispatch({ type: actionTypes.USER_FAILED, error: e });
      });
  };
}
export function loginUser({ username, password }: UserLoginData) {
  const action: UserAction = {
    type: actionTypes.USER_LOGIN,
  };

  return (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.USER_LOAD });
    return WPAPI.getNonce()
      .then((nonce) => {
        return WPAPI.login({
          username: username,
          password: password,
          security: nonce,
        })
          .then(() => window.location.reload())
          .catch((e) => dispatch({ type: actionTypes.USER_FAILED, error: e }));
      })
      .catch((e) => dispatch({ type: actionTypes.USER_FAILED, data: e }));
  };
}
