import * as actionTypes from "../actionTypes";
import API from "../../../utils/api";
import { operations } from "../../../utils/schema";
import { updateFiscalProfile } from "./updateFiscalProfile";

export const updateProfile = (
  data: operations["patch-users-me"]["requestBody"]["content"]["application/json"],
  unverifiedFiscalProfileMessage?: string
) => {
  return async (dispatch: any, getState: () => GeneralState) => {
    try {
      const state = getState();
      const response = await API.patchMe(data);
      if (state.user.fiscal && unverifiedFiscalProfileMessage) {
        if (
          state.user.user.name !== data.name ||
          state.user.user.surname !== data.surname ||
          state.user.user.birthDate !== data.birthDate
        ) {
          const submitValues = {
            address: state.user.fiscal.data?.address,
            type: state.user.fiscal.data?.type,
            birthPlace: {
              city: state.user.fiscal.data?.birthPlace?.city,
              province: state.user.fiscal.data?.birthPlace?.province,
            },
            fiscalId: state.user.fiscal.data?.fiscalId,
            gender: state.user.fiscal.data?.gender,
          };
          dispatch(
            updateFiscalProfile(submitValues as UserData, {
              verifiedMessage: false,
              unverifiedMessage: unverifiedFiscalProfileMessage,
            })
          );
        }
      }
      dispatch({
        type: actionTypes.FETCH_PROFILE,
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
