import apifetch from "src/utils/apifetch";

export const deleteMedia = async (
  body: ApiOperations["delete-media"]["requestBody"]["content"]["application/json"],
  token?: string
): Promise<ApiOperations["delete-media"]["responses"]["200"]> => {
  return apifetch({
    endpoint: "/media",
    method: "DELETE",
    token: token,
    body: body,
  });
};
