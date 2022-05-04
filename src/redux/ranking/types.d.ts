type RankingState = {
  rankings: ApiOperations["get-users-me-rank-list"]["responses"]["200"]["content"]["application/json"];
  isLoading: boolean;
  summary?: ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"];
};

type RankingActions =
  | RankingActions_SetRankings
  | RankingActions_SetIsLoading
  | RankingActions_SetSummary;

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

type RankingActions_SetSummary = {
  type: "ranking/setRankingSummary";
  payload: RankingState["summary"];
};
