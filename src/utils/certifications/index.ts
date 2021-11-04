import { operations } from "../schema";
import apifetch from "../apifetch";

export const certifications = async ({
  filterBy,
}: {
  filterBy?: { institute?: string; area?: string };
}): Promise<
  operations["get-certifications"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/certifications",
    params: filterBy,
    paramType: "filterBy",
  });
};
