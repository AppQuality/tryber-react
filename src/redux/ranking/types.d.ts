type RankingState = {
  rankings: {};
  summary?: ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"];
};

type RankingActions = RankingActions_SetRankings | RankingActions_SetSummary;

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
