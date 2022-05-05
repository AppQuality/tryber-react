type RankingState = {
  rankings: {};
  summary?: ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"];
  // TODO Remove
  levelInfo?: {
    id: number;
    name: string;
    reach: number;
    hold: number;
  }[];
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
  // TODO Remove
  payload: {
    id: number;
    name: string;
    reach: number;
    hold: number;
  }[];
};
