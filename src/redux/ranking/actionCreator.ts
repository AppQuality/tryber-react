import { ThunkAction } from "redux-thunk";
import API from "../../utils/api";
import { addMessage } from "../siteWideMessages/actionCreators";

export const fetchRankings =
  (): ThunkAction<Promise<any>, GeneralState, unknown, RankingActions> =>
  async (dispatch) => {
    try {
      const data = await API.getRankings();
      return dispatch({
        type: "ranking/setRankings",
        payload: data,
      });
    } catch (e) {
      const error = e as HttpError;
      addMessage(error.message, "danger", false);
    }
  };
