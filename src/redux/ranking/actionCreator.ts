import { ThunkAction } from "redux-thunk";
import API from "../../utils/api";
import { addMessage } from "../siteWideMessages/actionCreators";

export const fetchRankings =
  (): ThunkAction<Promise<any>, GeneralState, unknown, RankingActions> =>
  async (dispatch) => {
    try {
      // const data = await API.getRankings();
      // TODO Remove
      const data = {
        tops: [
          {
            position: 1,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 3090,
            name: "aaaaa",
            monthly_exp: 80,
          },
          {
            position: 2,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 8090,
            name: "bbbbb",
            monthly_exp: 70,
          },
          {
            position: 3,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 2780,
            name: "ccccc",
            monthly_exp: 60,
          },
        ],
        peers: [],
      };

      return dispatch({
        type: "ranking/setRankings",
        payload: data,
      });
    } catch (e) {
      const error = e as HttpError;
      addMessage(error.message, "danger", false);
    }
  };
