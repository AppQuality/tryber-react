import API from "../../../utils/api";
import { addMessage } from "../../siteWideMessages/actionCreators";
import * as actionTypes from "../actionTypes";
import { updateFiscalProfile } from "./updateFiscalProfile";

export const updateProfile = (
  data: {
    profile: ApiOperations["patch-users-me"]["requestBody"]["content"]["application/json"];
    languages?: number[];
  },
  unverifiedFiscalProfileMessage?: string,
  verifiedFiscalProfileMessage?: string,
  profileUpdatedMessage?: string,
  genericErrorMessage?: string,
  emailErrorMessage?: string,
  onSuccess?: () => void
) => {
  return async (dispatch: any, getState: () => GeneralState) => {
    try {
      const state = getState();
      if (data.languages) await API.myLanguages(data.languages);
      const response = await API.patchMe(data.profile);
      if (!response.languages) {
        response.languages = [];
      }
      if (
        state.user.fiscal.data &&
        state.user.fiscal.data.type !== "internal" &&
        unverifiedFiscalProfileMessage &&
        verifiedFiscalProfileMessage
      ) {
        if (
          state.user.user.name !== data.profile.name ||
          state.user.user.surname !== data.profile.surname ||
          state.user.user.birthDate !== data.profile.birthDate
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
              verifiedMessage:
                state.user.fiscal.data.fiscalStatus === "Unverified"
                  ? verifiedFiscalProfileMessage
                  : false,
              unverifiedMessage: unverifiedFiscalProfileMessage,
            })
          );
        }
      }
      dispatch(addMessage(profileUpdatedMessage, "success"));
      onSuccess?.();
      dispatch({
        type: actionTypes.FETCH_PROFILE,
        data: response,
      });
    } catch (e: HttpError) {
      if (e.statusCode === 412) {
        dispatch(addMessage(emailErrorMessage, "danger"));
      } else {
        dispatch(addMessage(genericErrorMessage, "warning"));
      }
    }
  };
};
