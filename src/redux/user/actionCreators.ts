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
      const baseData = await API.me(undefined, "all");
      dispatch({
        type: actionTypes.FETCH_PROFILE,
        data: { ...baseData },
      });
    } catch (err: unknown) {
      dispatch({
        type: actionTypes.FETCH_PROFILE_FAILED,
        error: err as HttpError,
      });
    }
  };
};

export const getFiscalProfile = () => {
  return async (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.FETCH_FISCAL_PROFILE_LOADING });
    try {
      const fiscalData = await API.myFiscalData({});
      dispatch({
        type: actionTypes.FETCH_FISCAL_PROFILE,
        data: { ...fiscalData },
      });
    } catch (err: unknown) {
      dispatch({
        type: actionTypes.FETCH_FISCAL_PROFILE_FAILED,
        error: err as HttpError,
      });
    }
  };
};

export const updateDeletionReason = (reason: string) => {
  return async (dispatch: UserDispatchType) => {
    dispatch({
      type: actionTypes.UPDATE_DELETION_REASON,
      data: { reason },
    });
  };
};
export const deleteUser = (currentLanguage: string) => {
  return async (dispatch: UserDispatchType, getState: () => GeneralState) => {
    const { deletionReason } = getState().user;
    await API.deleteUser({
      reason: deletionReason || "",
    });
    await fetch("/wp-admin/admin-ajax.php?action=appq_wp_logout");
    window.location.href = `/${currentLanguage}goodbye`;
    console.log(deletionReason);
  };
};

export const openDeleteModal = () => {
  return async (dispatch: UserDispatchType) => {
    dispatch({
      type: actionTypes.OPEN_DELETE_MODAL,
    });
  };
};

export const closeDeleteModal = () => {
  return async (dispatch: UserDispatchType) => {
    dispatch({
      type: actionTypes.CLOSE_DELETE_MODAL,
    });
  };
};
