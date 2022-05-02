type RankingState = {
  rankings: {};
  summary?: {
    level: {
      id: number;
      name: string;
    };
    previousLevel: {
      id: number;
      name: string;
    };
    rank: number;
    points: number;
    prospect: {
      level: {
        id: number;
        name: string;
      };
      next: {
        points: number;
        level: {
          id: number;
          name: string;
        };
      };
    };
  };
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
