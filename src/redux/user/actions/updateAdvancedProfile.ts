import API from "src/utils/api";
import * as actionTypes from "../actionTypes";

export const updateAdvancedProfile = (
  data: {
    profile: ApiOperations["patch-users-me"]["requestBody"]["content"]["application/json"];
    deleteCertificate?: boolean;
    cuf: {
      id: string;
      values: ApiOperations["put-users-me-additionals-fieldId"]["requestBody"]["content"]["application/json"];
    }[];
  },
  callbacks?: {
    onSuccess: () => void;
    onFailure: () => void;
  }
) => {
  return async (dispatch: any) => {
    try {
      await Promise.all(
        data.cuf.map((cuf) => {
          return API.updateCustomUserFields(cuf.id, cuf.values);
        })
      );

      await API.patchMe(data.profile);

      if (data.deleteCertificate) {
        await API.addCertification({ certifications: false });
      }

      const updatedUser = await API.me(
        undefined,
        "additional,certifications,education,profession"
      );

      dispatch({
        type: actionTypes.FETCH_PROFILE,
        data: { ...updatedUser },
      });
      callbacks?.onSuccess?.();
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_PROFILE_FAILED, error: e });
      callbacks?.onFailure?.();
    }
  };
};
