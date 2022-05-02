export const initialState: RankingState = {
  isLoading: true,
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
    case "ranking/setIsLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
