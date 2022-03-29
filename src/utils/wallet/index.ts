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
  body: ApiOperations["post-users-me-payments"]["requestBody"]["content"]["application/json"],
  token?: string
): Promise<
  ApiOperations["post-users-me-payments"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me/payments",
    token: token,
    method: "POST",
    body: body,
  });
};

export const getUserPaymentDetails = async (
  id: number,
  query?: ApiOperations["get-users-me-payments-payment"]["parameters"]["query"],
  token?: string
): Promise<
  ApiOperations["get-users-me-payments-payment"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: `/users/me/payments/${id}`,
    token: token,
    params: query,
  });
};

export const getUserBootyDetails = async (
  query?: ApiOperations["get-users-me-pending-booty"]["parameters"]["query"],
  token?: string
): Promise<
  ApiOperations["get-users-me-pending-booty"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me/pending_booty",
    token: token,
    params: query,
  });
};
