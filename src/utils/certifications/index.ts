import { operations } from "../schema";
import apifetch from "../apifetch";

export const certifications = async ({
  filterBy,
}: {
  filterBy?: operations["get-certifications"]["parameters"]["query"]["filterBy"];
}): Promise<
  operations["get-certifications"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/certifications",
    params: filterBy,
    paramType: "filterBy",
  });
};

export const addCertification = async (certification: {
  certification_id: number;
  achievement_date: string;
}): Promise<
  operations["get-certifications"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me/certifications",
    method: "POST",
    body: certification,
  });
};
