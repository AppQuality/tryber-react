import * as actionTypes from "./actionTypes";
import API from "../../utils/api";
import WPAPI from "../../utils/wpapi";
import HttpError from "../../utils/HttpError";

export function refreshUser() {
  const action: UserAction = {
    type: actionTypes.USER_REFRESH,
  };

  return (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.USER_LOAD });
    return API.me(undefined, "name,surname,image,onboarding_completed,email")
      .then((user) => {
        action.data = user;
        return dispatch(action);
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

export const getProfile = () => {
  return async (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.FETCH_PROFILE_LOADING });
    try {
      const profileData = await API.me(undefined, "all");
      const fiscalData = await API.myFiscalData({});
      dispatch({
        type: actionTypes.FETCH_PROFILE,
        data: { profileData: profileData, fiscalData: fiscalData },
      });
    } catch (err: unknown) {
      const { message } = err as HttpError;
      dispatch({ type: actionTypes.FETCH_PROFILE_FAILED, error: message });
    }
  };
};
