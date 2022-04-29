type RankingState = {
  rankings: {};
};

type RankingActions = RankingActions_SetRankings;

/**
 *  Action types and their payloads
 */

type RankingActions_SetRankings = {
  type: "ranking/setRankings";
  payload: {};
};
