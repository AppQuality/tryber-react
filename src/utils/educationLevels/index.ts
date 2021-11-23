import apifetch from "../apifetch";
import { operations } from "../schema";

export const educationLevels = async ({
  token,
}: {
  token?: string;
}): Promise<
  operations["get-education"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/education",
    token: token,
  });
};
