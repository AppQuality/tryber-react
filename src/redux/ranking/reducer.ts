export const initialState: RankingState = {
  rankings: {},
};

export default (state = initialState, action: RankingActions) => {
  switch (action.type) {
    case "ranking/setRankings":
      return {
        ...state,
        rankings: {},
      };
    default:
      return state;
  }
};
