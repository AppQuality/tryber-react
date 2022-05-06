type RankingState = {
  rankings: {};
  summary?: ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"];
  levelInfo?: ApiOperations["get-levels"]["responses"]["200"]["content"]["application/json"];
};

type RankingActions =
  | RankingActions_SetRankings
  | RankingActions_SetSummary
  | RankingActions_SetLevelInfo;

/**
 *  Action types and their payloads
 */

type RankingActions_SetRankings = {
  type: "ranking/setRankings";
  payload: {};
};

type RankingActions_SetSummary = {
  type: "ranking/setRankingSummary";
  payload: RankingState["summary"];
};

type RankingActions_SetLevelInfo = {
  type: "ranking/setLevelInfo";
  payload: ApiOperations["get-levels"]["responses"]["200"]["content"]["application/json"];
};
