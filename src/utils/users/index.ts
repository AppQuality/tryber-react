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
  query?: operations["get-users-me-bugs"]["parameters"]["query"];
}) => {
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MTIxMDMsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwicGVybWlzc2lvbiI6eyJhZG1pbiI6eyJhcHBxX2J1ZyI6dHJ1ZSwiYXBwcV9jYW1wYWlnbl9kYXNoYm9hcmQiOnRydWUsImFwcHFfY2FtcGFpZ24iOnRydWUsImFwcHFfY291cnNlIjp0cnVlLCJhcHBxX21hbnVhbCI6dHJ1ZSwiYXBwcV9wcmV2aWV3Ijp0cnVlLCJhcHBxX3Byb3NwZWN0Ijp0cnVlLCJhcHBxX3Rhc2tfZGFzaGJvYXJkIjp0cnVlLCJhcHBxX3Rhc2siOnRydWUsImFwcHFfdGVzdGVyX3NlbGVjdGlvbiI6dHJ1ZSwiYXBwcV9tYWlsX21lcmdlIjp0cnVlLCJhcHBxX3ZpZGVvX2Rhc2hib2FyZCI6dHJ1ZSwiYXBwcV9wcm9maWxlIjp0cnVlLCJhcHBxX2N1c3RvbV91c2VyX2ZpZWxkIjp0cnVlLCJhcHBxX2Zpc2NhbF9wcm9maWxlIjp0cnVlLCJhcHBxX2NhbXBhaWduX2NhdGVnb3J5Ijp0cnVlLCJhcHBxX3F1YWxpdHlfYmFkZ2UiOnRydWV9LCJ0ZXN0ZXIiOnsiY2FtcGFpZ25zIjpbMjUxMSw0NjIsMjU1NCwyNjMwLDI2NDgsMjY5MSwyNjkyLDI4ODddfX0sImlhdCI6MTYyMjEyOTcyNCwiZXhwIjoxNjIyMTMwNjI0fQ.HpBZFa-wF_10b_lbGo6NCZ46f7p0g36eNpNNOdXB1SE";

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let params = "";
  if (query && Object.keys(query).length) {
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
    params = "?" + urlps.toString();
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
