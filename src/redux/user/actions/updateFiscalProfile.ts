import * as actionTypes from "../actionTypes";
import API from "../../../utils/api";
import { operations } from "../../../utils/schema";

export const updateFiscalProfile = ({
  data,
}: {
  data:
    | operations["post-users-me-fiscal"]["requestBody"]["content"]["application/json"]
    | operations["put-users-me-fiscal"]["requestBody"]["content"]["application/json"];
}) => {
  return async (dispatch: UserDispatchType, getState: () => GeneralState) => {
    const { fiscalData } = getState().user;
    dispatch({ type: actionTypes.FETCH_FISCAL_PROFILE_LOADING });
    try {
      const newFiscalData = fiscalData
        ? await API.putFiscalData({ data: data })
        : await API.postFiscalData({ data: data });
      dispatch({
        type: actionTypes.FETCH_FISCAL_PROFILE,
        data: { ...newFiscalData },
      });
    } catch (err: unknown) {
      const { statusCode } = err as HttpError;
      dispatch({
        type: actionTypes.FETCH_FISCAL_PROFILE_FAILED,
        error: err as HttpError,
      });
    }
  };
};
