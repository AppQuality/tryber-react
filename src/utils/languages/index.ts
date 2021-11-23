import HttpError from "../HttpError";
import { operations } from "../schema";

export const languages = async (
  token?: string
): Promise<
  operations["get-languages"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let url = `${process.env.REACT_APP_API_URL}/languages`;
  const response = await fetch(url, {
    method: "GET",
    headers: requestHeaders,
  });
  const results = await response.json();
  if (!response.ok)
    throw new HttpError(response.status, response.statusText, results.err);
  return results;
};
