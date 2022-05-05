import { ThunkAction } from "redux-thunk";
import API from "src/utils/api";

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
      console.log(e);
    }
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
      // const data = await API.getLevelInfo();
      // TODO Remove
      const data = [
        {
          id: 10,
          name: "Basic",
          hold: 0,
          reach: 0,
        },
        {
          id: 20,
          name: "Bronze",
          hold: 50,
          reach: 100,
        },
        {
          id: 30,
          name: "Silver",
          hold: 150,
          reach: 250,
        },
        {
          id: 40,
          name: "Gold",
          hold: 300,
          reach: 500,
        },
        {
          id: 50,
          name: "Platinum",
          hold: 600,
          reach: 1000,
        },
        {
          id: 60,
          name: "Diamond",
          hold: 2000,
          reach: 3000,
        },
        {
          id: 100,
          name: "Legendary",
          hold: 0,
          reach: 0,
        },
      ];

      return dispatch({
        type: "ranking/setLevelInfo",
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
