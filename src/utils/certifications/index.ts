import { operations } from "../schema";
import apifetch from "../apifetch";

export const getCertifications = async ({
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

export const deleteCertification = async (
  certificationId: number
): Promise<
  operations["delete-users-me-certifications-certificationId"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me/certifications/" + certificationId.toString(),
    method: "DELETE",
  });
};
