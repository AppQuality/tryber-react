import apifetch from "../apifetch";
import { operations } from "../schema";

export const certifications = async ({
  token,
}: {
  token?: string;
}): Promise<
  operations["get-certifications"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/employments",
    token: token,
  });
};
