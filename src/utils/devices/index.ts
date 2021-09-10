import HttpError from "../HttpError";
import { operations } from "../schema";

export const getModels = async ({
  token,
  deviceType,
}: {
  token?: string;
  deviceType: number;
}): Promise<
  operations["get-devices-devices-type-model"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/devices/${deviceType}/models`,
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

export const getOsPlatforms = async ({
  token,
  deviceType,
}: {
  token?: string;
  deviceType: number;
}): Promise<
  operations["get-devices-operating-systems"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/devices/${deviceType}/operating_systems`,
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

export const getOsVersions = async ({
  token,
  deviceType,
}: {
  token?: string;
  deviceType: number;
}): Promise<
  operations["get-devices-os-versions"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/devices/${deviceType}/operating_systems`,
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
