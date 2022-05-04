import apifetch from "src/utils/apifetch";

export const getUserRankingSummary = async (
  token?: string
): Promise<
  ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me/rank",
    token: token,
  });
};
