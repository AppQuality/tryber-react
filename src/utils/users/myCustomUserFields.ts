import { operations } from "../schema";
import apifetch from "../apifetch";

export const updateCustomUserFields = async (
  fieldId: string,
  data: ApiOperations["put-users-me-additionals-fieldId"]["requestBody"]["content"]["application/json"],
  token?: string
): Promise<
  operations["put-users-me-additionals-fieldId"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: `/users/me/additionals/${fieldId}`,
    method: "PUT",
    token: token,
    body: data,
  });
};
