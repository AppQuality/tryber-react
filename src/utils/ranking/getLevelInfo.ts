import apifetch from "src/utils/apifetch";

export const getLevelInfo = async (
  token?: string
): Promise<
  ApiOperations["get-levels"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/levels",
    token: token,
  });
};
