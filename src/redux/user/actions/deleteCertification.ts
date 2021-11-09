import * as actionTypes from "../actionTypes";
import API from "src/utils/api";
import { ReactNode } from "react";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";

export function deleteCertification(
  certificationId: number,
  onSuccessMsg?: ReactNode,
  onFailMsg?: ReactNode
) {
  return (dispatch: any) => {
    return API.deleteCertification(certificationId)
      .then(async () => {
        try {
          const res = await API.me(undefined, "certifications");
          dispatch(addMessage(onSuccessMsg, "success"));
          return dispatch({
            type: actionTypes.UPDATE_CERTIFICATIONS,
            data: { newCertifications: res.certifications || [] },
          });
        } catch (e) {
          dispatch({ type: actionTypes.FETCH_PROFILE_FAILED, error: e });
          dispatch(addMessage(onFailMsg, "danger"));
        }
      })
      .catch((e) => {
        dispatch(addMessage(onFailMsg, "danger"));
      });
  };
}
