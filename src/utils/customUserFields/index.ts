import apifetch from "../apifetch";
import { operations } from "../schema";

export const customUserFields = async ({
  token,
}: {
  token?: string;
}): Promise<
  operations["get-customUserFields"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/custom_user_fields",
    token: token,
  });
};
