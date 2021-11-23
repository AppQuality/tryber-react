import apifetch from "../apifetch";
import { operations } from "../schema";

export const employments = async ({
  token,
}: {
  token?: string;
}): Promise<
  operations["get-employments"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/employments",
    token: token,
  });
};
