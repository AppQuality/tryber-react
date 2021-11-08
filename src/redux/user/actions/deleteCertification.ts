import * as actionTypes from "../actionTypes";
import API from "src/utils/api";

export function deleteCertification(certificationId: number) {
  return (dispatch: UserDispatchType) => {
    dispatch({ type: actionTypes.DELETE_CERTIFICATION_LOADING });
    return API.deleteCertification(certificationId)
      .then(async () => {
        try {
          const res = await API.me(undefined, "certifications");
          return dispatch({
            type: actionTypes.DELETE_CERTIFICATION,
            data: { newCertifications: res.certifications || [] },
          });
        } catch (e) {
          dispatch({ type: actionTypes.FETCH_PROFILE_FAILED, error: e });
        }
      })
      .catch((e) => {
        dispatch({ type: actionTypes.DELETE_CERTIFICATION_FAILED, error: e });
      });
  };
}
