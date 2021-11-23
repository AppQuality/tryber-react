import * as actionTypes from "../actionTypes";
import API from "../../../utils/api";

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
