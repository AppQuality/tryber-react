import { ThunkAction } from "redux-thunk";

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
      dispatch({
        type: "ranking/setRankingSummary",
        payload: {
          level: {
            id: 20,
            name: "Bronze",
          },
          previousLevel: {
            id: 10,
            name: "Basic",
          },
          rank: 3,
          points: 100,
          prospect: {
            level: {
              id: 40,
              name: "Gold",
            },
            next: {
              points: 10,
              level: {
                id: 50,
                name: "Diamond",
              },
            },
          },
        },
      });
    } catch (e) {}
  };
