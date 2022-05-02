import apifetch from "src/utils/apifetch";

export const getRankings = async (
  token?: string
): Promise<// ApiOperations["get-users-me-rank-list"]["responses"]["200"]["content"]["application/json"]
// TODO Remove
{
  tops: [];
  peers: [];
}> => {
  return apifetch({
    endpoint: "/users/me/rank/list",
    token: token,
  });
};
