export const initialState: RankingState = {
  rankings: {
    tops: [],
    peers: [],
  },
};

export default (state = initialState, action: RankingActions) => {
  switch (action.type) {
    case "ranking/setRankings":
      return {
        ...state,
        rankings: action.payload,
      };
    default:
      return state;
  }
};
