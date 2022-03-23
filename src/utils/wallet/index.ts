import apifetch from "src/utils/apifetch";

export const getUserPaymentRequests = async (
  query?: ApiOperations["get-users-me-payments"]["parameters"]["query"],
  token?: string
): Promise<
  ApiOperations["get-users-me-payments"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me/payments",
    token: token,
    params: query,
  });
};

export const getBooty = async (
  query?: ApiOperations["get-users-me"]["parameters"]["query"],
  token?: string
): Promise<
  ApiOperations["get-users-me"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me",
    token: token,
    params: query,
  });
};

export const postPaymentRequest = async (
  token?: string
): Promise<
  ApiOperations["post-users-me-payments"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me/payments",
    token: token,
    method: "POST",
  });
};
