type RankingState = {
  rankings: ApiOperations["get-users-me-rank-list"]["responses"]["200"]["content"]["application/json"];
  isLoading: boolean;
};

type RankingActions = RankingActions_SetRankings | RankingActions_SetIsLoading;

/**
 *  Action types and their payloads
 */

type RankingActions_SetRankings = {
  type: "ranking/setRankings";
  payload: ApiOperations["get-users-me-rank-list"]["responses"]["200"]["content"]["application/json"];
};

type RankingActions_SetIsLoading = {
  type: "ranking/setIsLoading";
  payload: boolean;
};
