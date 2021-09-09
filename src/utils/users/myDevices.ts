import HttpError from "../HttpError";
import { operations } from "../schema";

export const myDevices = async ({ token }: { token?: string }) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/me/devices`, {
    method: "GET",
    headers: requestHeaders,
  });
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};
