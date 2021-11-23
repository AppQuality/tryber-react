import * as actionTypes from "../actionTypes";
import API from "src/utils/api";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";

export const getCustomUserFields = () => {
  return async (dispatch: any) => {
    try {
      const groups = await API.customUserFields({});
      dispatch({
        type: actionTypes.GET_CUSTOM_USER_FIELDS,
        data: groups,
      });
    } catch (err: unknown) {
      const { message } = err as HttpError;
      dispatch(
        addMessage(
          "error loading custom user fields group: " + message,
          "danger"
        )
      );
    }
  };
};
