import * as actionTypes from "../actionTypes";
import API from "../../../utils/api";
import { operations } from "../../../utils/schema";

export const updateProfile = (
  data: operations["patch-users-me"]["requestBody"]["content"]["application/json"]
) => {
  return async (dispatch: UserDispatchType) => {
    try {
      const response = await API.patchMe(data);
      dispatch({
        type: actionTypes.FETCH_PROFILE,
        // @ts-ignore
        data: response,
      });
    } catch (err: unknown) {
      dispatch({
        type: actionTypes.FETCH_PROFILE_FAILED,
        error: err as HttpError,
      });
    }
  };
};
