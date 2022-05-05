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
    case "ranking/setRankingSummary":
      return {
        ...state,
        summary: action.payload,
      };
    case "ranking/setLevelInfo":
      return {
        ...state,
        levelInfo: action.payload,
      };
    default:
      return state;
  }
};
