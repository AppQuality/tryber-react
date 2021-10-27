import * as actionTypes from "../actionTypes";
import API from "../../../utils/api";

export const updateFiscalProfile = () => {
  return async (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.FETCH_FISCAL_PROFILE_LOADING });
    try {
      const fiscalData = await API.myFiscalData({});
      dispatch({
        type: actionTypes.FETCH_FISCAL_PROFILE,
        data: { ...fiscalData },
      });
    } catch (err: unknown) {
      const { statusCode } = err as HttpError;
      if (statusCode === 404) {
        return dispatch({
          type: actionTypes.FETCH_FISCAL_PROFILE,
        });
      }
      dispatch({
        type: actionTypes.FETCH_FISCAL_PROFILE_FAILED,
        error: err as HttpError,
      });
    }
  };
};
