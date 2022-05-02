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
        peers: [
          {
            position: 81,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 3090,
            name: "aaaaa",
            monthly_exp: 50,
          },
          {
            position: 82,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 8090,
            name: "bbbbb",
            monthly_exp: 40,
          },
          {
            position: 83,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 2412,
            name: "ddddd",
            monthly_exp: 30,
          },
          {
            position: 84,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 6767,
            name: "eeeee",
            monthly_exp: 20,
          },
          {
            position: 85,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 1789,
            name: "ffffff",
            monthly_exp: 15,
          },
          {
            position: 86,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 6575,
            name: "ggggg",
            monthly_exp: 10,
          },
          {
            position: 87,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 8787,
            name: "hhhhhh",
            monthly_exp: 9,
          },
          {
            position: 88,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 5445,
            name: "iiiiii",
            monthly_exp: 5,
          },
          {
            position: 89,
            image:
              "https://secure.gravatar.com/avatar/c8d14ccfd1de75728885d07e5b49823b?s=132&d=https%3A%2F%2Feu.ui-avatars.com%2Fapi%2Falessandro%2Bgiommi%2F132&r=x",
            id: 8642,
            name: "lllllll",
            monthly_exp: 2,
          },
        ],
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
