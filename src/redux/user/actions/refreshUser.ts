import * as actionTypes from "../actionTypes";
import API from "../../../utils/api";

export function refreshUser(additionalFields?: string) {
  const action: UserAction = {
    type: actionTypes.USER_REFRESH,
  };

  let query = "name,surname,image,onboarding_completed,email";
  if (additionalFields) {
    query += `,${additionalFields}`;
  }

  return (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.USER_LOAD });
    return API.me(undefined, query)
      .then((user) => {
        action.data = user;
        return dispatch(action);
      })
      .catch((e) => {
        dispatch({ type: actionTypes.USER_FAILED, error: e });
      });
  };
}
