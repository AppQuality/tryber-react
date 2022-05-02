type RankingState = {
  // rankings: ApiOperations["get-users-me-rank-list"]["responses"]["200"]["content"]["application/json"];
  isLoading: boolean;
  // TODO Remove
  rankings: {
    tops: {
      position: number;
      image: string;
      id: number;
      name: string;
      monthly_exp: number;
    }[];
    peers: {
      position: number;
      image: string;
      id: number;
      name: string;
      monthly_exp: number;
    }[];
  };
};

type RankingActions = RankingActions_SetRankings | RankingActions_SetIsLoading;

/**
 *  Action types and their payloads
 */

type RankingActions_SetRankings = {
  type: "ranking/setRankings";
  // payload: ApiOperations["get-users-me-rank-list"]["responses"]["200"]["content"]["application/json"];
  // TODO Remove
  payload: {
    tops: {
      position: number;
      image: string;
      id: number;
      name: string;
      monthly_exp: number;
    }[];
    peers: {
      position: number;
      image: string;
      id: number;
      name: string;
      monthly_exp: number;
    }[];
  };
};

type RankingActions_SetIsLoading = {
  type: "ranking/setIsLoading";
  payload: boolean;
};
