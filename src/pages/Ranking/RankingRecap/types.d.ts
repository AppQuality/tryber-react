interface UserRankProps {
  user: {
    image?: string;
    name?: string;
    surname?: string;
    id?: number;
    total_exp_pts?: number;
  };
  rankingSummary: ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"];
  levelsList?: ApiOperations["get-levels"]["responses"]["200"]["content"]["application/json"];
}

interface LevelProps {
  level: ApiComponents["schemas"]["MonthlyLevel"];
  color?: "main" | "background1" | "background2" | "textColor";
  size?: "medium" | "large";
  hideName?: boolean;
}
