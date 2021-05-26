import config from "../../config.json";
import HttpError from "../HttpError";
import { operations } from "../schema";

export const me = async (token?: string) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(`${config.api}/users/me`, {
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

export const myBugs = async ({
  token,
  query,
}: {
  token?: string;
  query: operations["get-users-me-bugs"]["parameters"]["query"];
}) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let params = "";
  if (Object.keys(query).length) {
    let urlps = new URLSearchParams();
    if (query.start) {
      urlps.set("start", query.start.toString());
    }
    if (query.order) {
      urlps.set("order", query.order);
    }
    if (query.orderBy) {
      urlps.set("orderBy", query.orderBy);
    }
    if (query.limit) {
      urlps.set("limit", query.limit.toString());
    }
    if (query.filterBy) {
      Object.entries(query.filterBy).forEach(([key, val]) => {
        urlps.set(`filterBy[${key}]`, val);
      });
    }
    params = urlps.toString();
  }
  const res = await fetch(`${config.api}/users/me/bugs${params}`, {
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
