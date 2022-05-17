interface UserRankProps {
  user: UserData;
  rankingSummary: ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"];
  levelsList?: ApiOperations["get-levels"]["responses"]["200"]["content"]["application/json"];
}

interface LevelProps {
  level: ApiComponents["schemas"]["MonthlyLevel"];
  color?: "main" | "background1" | "background2" | "textColor";
  size?: "medium" | "large";
}
