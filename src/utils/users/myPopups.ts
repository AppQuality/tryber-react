import HttpError from "../HttpError";

export const myPopups = async ({
  token,
  showExpired,
}: {
  token?: string;
  showExpired: boolean;
}) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let params = "";
  if (showExpired) {
    let urlps = new URLSearchParams();
    urlps.set("showExpired", showExpired.toString());
    params = "?" + urlps.toString();
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/users/me/popups${params}`,
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

export const myPopupsById = async ({
  token,
  popupId,
}: {
  token?: string;
  popupId: number;
}) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/users/me/popups/${popupId}`,
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
