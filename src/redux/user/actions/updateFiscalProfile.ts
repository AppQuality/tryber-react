import * as actionTypes from "../actionTypes";
import API from "../../../utils/api";
import { operations } from "../../../utils/schema";
import { addMessage } from "../../siteWideMessages/actionCreators";

export const updateFiscalProfile = (
  data:
    | operations["post-users-me-fiscal"]["requestBody"]["content"]["application/json"]
    | operations["put-users-me-fiscal"]["requestBody"]["content"]["application/json"],
  {
    verifiedMessage = "Verified",
    unverifiedMessage = "Unverified",
  }: {
    verifiedMessage?: React.ReactNode;
    unverifiedMessage?: React.ReactNode;
  } = {}
) => {
  return async (
    dispatch: UserDispatchType | SiteWideMessagesDispatchType,
    getState: () => GeneralState
  ) => {
    const userDispatch = dispatch as UserDispatchType;
    const messageDispatch = dispatch as any;
    const state = getState();
    const { user } = state;
    userDispatch({ type: actionTypes.FETCH_FISCAL_PROFILE_LOADING });
    try {
      const newFiscalData = user.user.fiscal
        ? await API.putFiscalData({ data: data })
        : await API.postFiscalData({ data: data });
      userDispatch({
        type: actionTypes.FETCH_FISCAL_PROFILE,
        data: { ...newFiscalData },
      });
      if (newFiscalData.fiscalStatus === "Verified") {
        messageDispatch(addMessage(verifiedMessage, "success"));
      } else {
        messageDispatch(addMessage(unverifiedMessage, "danger"));
      }
    } catch (err: unknown) {
      const { statusCode } = err as HttpError;
      userDispatch({
        type: actionTypes.FETCH_FISCAL_PROFILE_FAILED,
        error: err as HttpError,
      });
    }
  };
};
