import { ThunkAction } from "redux-thunk";
import API from "src/utils/api";

export const fetchRankings =
  (): ThunkAction<Promise<any>, GeneralState, unknown, RankingActions> =>
  async (dispatch) => {
    try {
    } catch (e) {}
  };

export const fetchRankingSummary =
  (): ThunkAction<Promise<any>, GeneralState, unknown, RankingActions> =>
  async (dispatch) => {
    try {
      const summary = await API.getUserRankingSummary();
      dispatch({
        type: "ranking/setRankingSummary",
        payload: summary,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const fetchLevelInfo =
  (): ThunkAction<Promise<any>, GeneralState, unknown, RankingActions> =>
  async (dispatch) => {
    try {
      const data = await API.getLevelInfo();
      return dispatch({
        type: "ranking/setLevelInfo",
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
