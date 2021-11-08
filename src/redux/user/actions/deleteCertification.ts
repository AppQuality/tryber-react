import * as actionTypes from "../actionTypes";
import API from "../../../utils/api";

export function deleteCertification(certificationId: number) {
  const action: UserAction = {
    type: actionTypes.DELETE_CERTIFICATION,
  };

  return (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.DELETE_CERTIFICATION_LOADING });
    return API.deleteCertification(certificationId)
      .then(() => {
        action.data = { certificationId: certificationId };
        return dispatch(action);
      })
      .catch((e) => {
        dispatch({ type: actionTypes.DELETE_CERTIFICATION_FAILED, error: e });
      });
  };
}
