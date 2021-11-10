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
      if (state.user.user.fiscal && unverifiedFiscalProfileMessage) {
        if (
          state.user.user.name !== data.name ||
          state.user.user.surname !== data.surname ||
          state.user.user.birthDate !== data.birthDate
        ) {
          const submitValues = {
            address: state.user.user.fiscal?.address,
            type: state.user.user.fiscal?.type,
            birthPlace: {
              city: state.user.user.fiscal?.birthPlace?.city,
              province: state.user.user.fiscal?.birthPlace?.province,
            },
            fiscalId: state.user.user.fiscal?.fiscalId,
            gender: state.user.user.fiscal?.gender,
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
