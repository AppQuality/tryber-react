import apifetch from "src/utils/apifetch";

export const getUserRankingSummary = async (
  token?: string
): Promise<
  ApiOperations["get-users-me-rank"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    headers: { "x-tryber-mock-example": "200:bronze-to-gold" },
    endpoint: "/users/me/rank",
    token: token,
  });
};
