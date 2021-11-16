import { ReactNode } from "react";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import API from "src/utils/api";
import { operations } from "src/utils/schema";
import * as actionTypes from "../actionTypes";

export function addCertification(
  certification: operations["post-users-me-certifications"]["requestBody"]["content"]["application/json"],
  onSuccessMsg?: ReactNode,
  onFailMsg?: ReactNode
) {
  return (dispatch: any) => {
    return API.addCertification(certification)
      .then(async () => {
        try {
          const res = await API.me(undefined, "certifications");
          dispatch(addMessage(onSuccessMsg, "success"));
          return dispatch({
            type: actionTypes.UPDATE_CERTIFICATIONS,
            data: {
              newCertifications:
                res.certifications === false ? false : res.certifications || [],
            },
          });
        } catch (e) {
          dispatch(addMessage(onFailMsg, "danger"));
          console.log(e);
          dispatch({ type: actionTypes.FETCH_PROFILE_FAILED, error: e });
        }
      })
      .catch((e) => {
        dispatch(addMessage(onFailMsg, "danger"));
        console.log(e);
      });
  };
}
