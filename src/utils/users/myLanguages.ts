import HttpError from "../HttpError";
import { operations } from "../schema";

export const myLanguages = async (
  data: operations["put-users-me-languages"]["requestBody"]["content"]["application/json"],
  token?: string
): Promise<
  operations["put-users-me-languages"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/users/me/languages`,
    {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify(data),
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};
