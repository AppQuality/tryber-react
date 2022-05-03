interface UserRankProps {
  user: UserData;
  rankingSummary: ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"];
}
