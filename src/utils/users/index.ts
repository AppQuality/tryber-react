import HttpError from "../HttpError";
import { operations } from "../schema";

export const me = async (
  token?: string,
  query?: string
): Promise<
  operations["get-users-me"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let url = `${process.env.REACT_APP_API_URL}/users/me`;
  if (query) {
    let urlps = new URLSearchParams();
    urlps.set("fields", query);
    url += "?" + urlps.toString();
  }
  const res = await fetch(url, {
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

export const patchMe = async (
  data: operations["patch-users-me"]["requestBody"]["content"]["application/json"],
  token?: string
): Promise<operations["patch-users-me"]["responses"]["200"]> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let url = `${process.env.REACT_APP_API_URL}/users/me`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  const results = await response.json();
  if (!response.ok)
    throw new HttpError(response.status, response.statusText, results.err);
  return results;
};

export const myBugs = async ({
  token,
  query,
}: {
  token?: string;
  query?: operations["get-users-me-bugs"]["parameters"]["query"];
}) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
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
        if (typeof val === "string") {
          urlps.set(`filterBy[${key}]`, val);
        }
      });
    }
    params = "?" + urlps.toString();
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/users/me/bugs${params}`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};

export const myCampaigns = async ({
  token,
  query,
}: {
  token?: string;
  query?: operations["get-users-me-campaigns"]["parameters"]["query"];
}) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
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
    if (query.limit) {
      urlps.set("limit", query.limit.toString());
    }
    if (query.order) {
      urlps.set("order", query.order);
    }
    if (query.orderBy) {
      urlps.set("orderBy", query.orderBy);
    }
    if (query.filterBy) {
      Object.entries(query.filterBy).forEach(([key, val]) => {
        if (typeof val === "string") {
          urlps.set(`filterBy[${key}]`, val);
        }
      });
    }
    params = "?" + urlps.toString();
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/users/me/campaigns${params}`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};

export const experiencePoints = async ({
  token,
  query,
}: {
  token?: string;
  query?: operations["get-users-me-experience"]["parameters"]["query"];
}) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
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
    if (query.searchBy) {
      urlps.set("searchBy", query.searchBy);
    }
    if (query.search) {
      urlps.set("search", query.search);
    }
    if (query.limit) {
      urlps.set("limit", query.limit.toString());
    }
    if (query.filterBy) {
      Object.entries(query.filterBy).forEach(([key, val]) => {
        if (typeof val === "string") {
          urlps.set(`filterBy[${key}]`, val);
        }
      });
    }
    params = "?" + urlps.toString();
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/users/me/experience${params}`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};

export * from "./myFiscalData";
export * from "./myLanguages";
export * from "./myPopups";
export * from "./myDevices";
export * from "./onboardingComplete";
export * from "./delete";
export * from "./changePassword";
