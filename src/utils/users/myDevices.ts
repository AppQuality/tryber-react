import HttpError from "../HttpError";
import { operations } from "../schema";

export const myDevices = async ({
  token,
}: {
  token?: string;
}): Promise<
  operations["get-users-me-devices"]["responses"]["200"]["content"]["application/json"]
> => {
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

export const addMyDevice = async ({
  token,
  newDevice,
}: {
  token?: string;
  newDevice: {
    device: string | number;
    operating_system: number;
  };
}): Promise<
  operations["post-users-me-devices"]["responses"]["201"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/me/devices`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(newDevice),
  });
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};

export const deleteDevice = async ({
  token,
  deviceId,
}: {
  token?: string;
  deviceId: number;
}): Promise<
  operations["delete-users-me-devices-deviceId"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/users/me/devices/${deviceId}`,
    {
      method: "DELETE",
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

export const editDevice = async ({
  token,
  deviceId,
  osId,
}: {
  token?: string;
  deviceId: number;
  osId: number;
}): Promise<
  operations["delete-users-me-devices-deviceId"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/users/me/devices/${deviceId}`,
    {
      method: "PATCH",
      headers: requestHeaders,
      body: JSON.stringify({
        operating_system: osId,
      }),
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    let errorText = "Error";
    try {
      const json = await res.json();
      errorText = json.err;
    } catch {
      errorText = "Error";
    }
    throw new HttpError(res.status, res.statusText, errorText);
  }
};
